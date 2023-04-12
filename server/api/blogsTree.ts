import { getAllfiles, blogsTreeHandler } from "../handler/blogsTree";
export default defineEventHandler(even => {
    return new Promise((resolve, reject) => {
        const blogsTree = []
        try {
            getAllfiles('_blogs', blogsTree)
            blogsTreeHandler(blogsTree)
            resolve(blogsTree)
        } catch (error) {
            reject(error)
        }
    })
})