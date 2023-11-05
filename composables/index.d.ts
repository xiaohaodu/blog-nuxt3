type GithubAuth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
  createTime: number;
  destroyTime: number;
  refreshTime: number;
};
type GithubUser = {
  avatar_url: string;
  name: string;
};
