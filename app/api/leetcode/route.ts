import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const username = "Rahul_dev_LC";
        const query = `
            query userSessionProgress($username: String!) {
                allQuestionsCount {
                    difficulty
                    count
                }
                matchedUser(username: $username) {
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                    }
                }
            }
        `;

        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify({
                query: query,
                variables: { username }
            })
        });

        const data = await response.json();

        if (data.errors) {
            return NextResponse.json({ error: data.errors[0].message }, { status: 500 });
        }

        const solved = data.data.matchedUser.submitStats.acSubmissionNum;
        const total = data.data.allQuestionsCount;

        return NextResponse.json({
            solved,
            total
        });

    } catch (error) {
        console.error("LeetCode API Error:", error);
        return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
    }
}
