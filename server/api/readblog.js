import fs from 'fs'
export default defineEventHandler(event => {
    return new Promise((resolve, reject) => {
        const query = getQuery(event)
        const path = query.path
        fs.readFile(`${path}`, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
})
