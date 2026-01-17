import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

export async function GET() {
    try {
        const username = "Rahul-R79";

        const query = `is:pr is:merged author:${username} -user:${username}`;

        const response = await octokit.request('GET /search/issues', {
            q: query,
            sort: 'created',
            order: 'desc',
            per_page: 100, 
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        const contributions = response.data.items.map((item: any) => {
            const repoUrlParts = item.repository_url.split('/');
            const repoName = `${repoUrlParts[repoUrlParts.length - 2]}/${repoUrlParts[repoUrlParts.length - 1]}`;

            return {
                id: item.id,
                repo: repoName,
                pr: item.title,
                status: "merged",
                link: item.html_url,
                date: new Date(item.closed_at).getFullYear().toString()
            };
        });

        return NextResponse.json(contributions);
    } catch (error) {
        console.error("GitHub API Error:", error);
        return NextResponse.json({ error: "Failed to fetch contributions" }, { status: 500 });
    }
}
