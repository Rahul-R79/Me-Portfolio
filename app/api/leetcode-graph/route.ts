import { NextResponse } from 'next/server';

export async function GET() {
    const username = 'Rahul_dev_LC';

    const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          submissionCalendar
        }
      }
    }
  `;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
        });

        const json = await response.json();

        if (json.errors) {
            console.error("LeetCode GraphQL Errors:", json.errors);
            return NextResponse.json({ error: 'LeetCode GraphQL Error', details: json.errors }, { status: 500 });
        }

        const submissionCalendar = json.data?.matchedUser?.userCalendar?.submissionCalendar;

        if (!submissionCalendar) {
            return NextResponse.json({ error: 'Data not found' }, { status: 404 });
        }

        // 1. Parse Calendar
        const parsedCalendar = JSON.parse(submissionCalendar);
        const entries = Object.entries(parsedCalendar).map(([timestamp, count]) => ({
            timestamp: parseInt(timestamp),
            count: count as number
        }));

        // 2. Transform Data
        const contributions = [];
        let total = 0;

        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setDate(today.getDate() - 365);

        for (const { timestamp, count } of entries) {
            const date = new Date(timestamp * 1000);
            const dateStr = date.toISOString().split('T')[0];

            let level = 0;
            if (count >= 1) level = 1;
            if (count >= 2) level = 2;
            if (count >= 3) level = 3;
            if (count >= 4) level = 4;

            contributions.push({
                date: dateStr,
                count,
                level
            });

            if (date >= oneYearAgo && date <= today) {
                total += count;
            }
        }

        contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({
            total,
            contributions
        });

    } catch (error) {
        console.error('Error fetching LeetCode graph:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
