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

const getAll = (uid: number) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT 
                u.name AS favorite_name,
                u.firstname AS favorite_firstname,
                fu.id AS favorite_id
            FROM favorite_users fu
            LEFT JOIN users u 
                ON fu.favoriteId = u.id
            WHERE fu.uid = ?`

        const database = mysqlConnection()

        try {
            database.query(sql, [uid], (err: MysqlError, res) => {
                if(err) reject(err)

                database.end(err => reject(err))

                console.log(res);

                resolve(res)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const remove = ({ id, uid }) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM favorite_users WHERE id= ? AND uid= ?`

        const database = mysqlConnection()

        try {
            database.query(sql, [id, uid], (err: MysqlError, res) => {
                if(err) reject(err)

                database.end(err => reject(err))

                console.log(res);

                resolve(res)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export default {
    add, 
    getAll, 
    remove
}