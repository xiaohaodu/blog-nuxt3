import fs from 'fs'
export default defineEventHandler(event => {
    return new Promise((resolve, reject) => {
        fs.readFile(`_blogs/README.md`, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
})
