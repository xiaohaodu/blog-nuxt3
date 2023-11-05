import { getAllFiles, blogsTreeHandler } from '../handler/blogsTree';
export default defineEventHandler((even) => {
  return new Promise((resolve, reject) => {
    const blogsTree = new Array<any>();
    try {
      getAllFiles('public/_blogs', blogsTree);
      blogsTreeHandler(blogsTree);
      resolve(blogsTree);
    } catch (error) {
      reject(error);
    }
  });
});
