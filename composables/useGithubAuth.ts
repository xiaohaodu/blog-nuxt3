export const useGithubAuth = (): Ref<GithubAuth> =>
  useState('githubAuth', () => {
    if (process.client) {
      return JSON.parse(localStorage.getItem('githubAuth') as string);
    } else {
      return '';
    }
  });
export const useGithubUser = (): Ref<GithubUser> =>
  useState('githubUser', () => {
    if (process.client) {
      return JSON.parse(localStorage.getItem('githubUser') as string);
    } else {
      return '';
    }
  });
