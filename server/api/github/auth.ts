import axios from 'axios';
import https from 'https';
export default defineEventHandler((event) => {
  return new Promise(async (resolve, reject) => {
    const body = getQuery(event);
    try {
      const { githubAccess } = useRuntimeConfig().public;
      const { data: githubAuth } = await axios({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${githubAccess.clientId}&` +
          `client_secret=${githubAccess.clientSecret}&` +
          `code=${body.code}`,
        headers: {
          accept: 'application/json',
        },
      });
      const now = new Date();
      sendRedirect(
        event,
        '/github/auth?githubAuth=' +
          encodeURIComponent(
            encodeURIComponent(
              JSON.stringify({
                ...githubAuth,
                createTime: now.getTime(),
                destroyTime: now.setSeconds(now.getSeconds() + githubAuth.refresh_token_expires_in),
                refreshTime: now.setSeconds(
                  now.getSeconds() + githubAuth.expires_in - githubAuth.refresh_token_expires_in,
                ),
              }),
            ),
          ),
        302,
      );
    } catch (error) {
      sendError(event, new Error(JSON.stringify(error)));
    }
  });
});
