import { mysqlConnection } from '../config/mysql'
import { Connection, MysqlError } from 'mysql'

// VARIABLE
let sql: string = ''


// STATIC FUNCTIONS


// EXPORT FUNCTIONS
const add = ({uid, favoriteId}) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO favorite_users ( uid, favoriteId )
                SELECT ?, ?
                WHERE NOT EXISTS (
                    SELECT 1 FROM favorite_users WHERE uid= ? AND favoriteId= ?
                )`

        const database = mysqlConnection()

        try {
            database.query(sql, [uid, favoriteId, uid, favoriteId], (err: MysqlError, res) => {
                if(err) reject(err)

                database.end(err => reject(err))

                resolve(res)
            })
        } catch (error) {
            reject(error)
        }
    })
}


export default {
    add
}