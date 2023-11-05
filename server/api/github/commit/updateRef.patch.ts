import { Octokit } from 'octokit';
export default defineEventHandler((event) => {
  return new Promise(async (resolve, reject) => {
    const body = await readBody(event);
    const octokit = new Octokit({
      auth: body.accessToken,
    });
    try {
      const { data: res } = await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
        ...body.updateRefConfig,
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
