import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json({ error: 'Missing GITHUB_TOKEN' }, { status: 500 });
    }

    const query = `
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { userName: 'Rahul-R79' },
            }),
        });

        const json = await response.json();

        if (json.errors) {
            console.error("GraphQL Errors:", json.errors);
            return NextResponse.json({ error: 'GraphQL Error', details: json.errors }, { status: 500 });
        }

        const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            return NextResponse.json({ error: 'Data not found' }, { status: 404 });
        }

        const contributions = [];

        const today = new Date().toISOString().split('T')[0];

        for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
                if (day.date > today) continue;

                contributions.push({
                    date: day.date,
                    count: day.contributionCount,
                    level: getLevel(day.contributionLevel),
                });
            }
        }

        return NextResponse.json({
            total: calendar.totalContributions,
            contributions
        });

    } catch (error) {
        console.error('Error fetching GitHub graph:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

function getLevel(level: string): number {
    switch (level) {
        case 'NONE': return 0;
        case 'FIRST_QUARTILE': return 1;
        case 'SECOND_QUARTILE': return 2;
        case 'THIRD_QUARTILE': return 3;
        case 'FOURTH_QUARTILE': return 4;
        default: return 0;
    }
}
