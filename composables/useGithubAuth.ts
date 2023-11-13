export const useGithubAuth = (): Ref<GithubAuth> =>
  useState('githubAuth', () => {
    if (process.client) {
      return JSON.parse(localStorage.getItem('githubAuth') as string);
    } else {
      throw new Error('useGithubAuth 仅可在process.client时运行');
    }
  });
export const useGithubUser = (): Ref<GithubUser> =>
  useState('githubUser', () => {
    if (process.client) {
      return JSON.parse(localStorage.getItem('githubUser') as string);
    } else {
      throw new Error('useGithubUser 仅可在process.client时运行');
    }
  });
