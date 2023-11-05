import axios from 'axios';

export default defineEventHandler((event) => {
  return new Promise<{
    massage: string;
    data: any;
  }>(async (resolve, reject) => {
    const body = getQuery(event);
    try {
      const { data: userInfo } = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: {
          Accept: 'application/json',
          Authorization: `token ${body.access_token}`,
        },
      });
      resolve({
        massage: 'success',
        data: userInfo,
      });
    } catch (error) {
      sendError(event, new Error(JSON.stringify(error)));
    }
  });
});
