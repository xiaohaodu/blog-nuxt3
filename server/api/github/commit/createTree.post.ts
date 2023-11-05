import { Octokit } from 'octokit';
export default defineEventHandler((event) => {
  return new Promise(async (resolve, reject) => {
    const body = await readBody(event);
    const octokit = new Octokit({
      auth: body.accessToken,
    });

    try {
      const { data: res } = await octokit.request('POST /repos/{owner}/{repo}/git/trees', {
        ...body.createTreeConfig,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      resolve(res);
    } catch (error) {
      resolve(error);
    }
  });
});
