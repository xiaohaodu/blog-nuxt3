import axios from 'axios';
import https from 'https';
export default defineEventHandler((event) => {
  return new Promise(async (resolve, reject) => {
    const body = await readBody(event);
    const { githubAccessDev, githubAccessServe } = useRuntimeConfig().public;
    const githubAccess =
      process.env.NODE_ENV === 'production' ? githubAccessServe : githubAccessDev;
    try {
      const { data: githubAuth } = await axios({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${githubAccess.clientId}&` +
          `client_secret=${githubAccess.clientSecret}&` +
          `grant_type=refresh_token&` +
          `refresh_token=${body.refresh_token}`,
        headers: {
          accept: 'application/json',
        },
      });
      const now = new Date();
      resolve({
        ...githubAuth,
        createTime: now.getTime(),
        destroyTime: now.setSeconds(now.getSeconds() + githubAuth.refresh_token_expires_in),
        refreshTime: now.setSeconds(
          now.getSeconds() + githubAuth.expires_in - githubAuth.refresh_token_expires_in,
        ),
      });
    } catch (error) {
      sendError(event, new Error(JSON.stringify(error)));
    }
  });
});
