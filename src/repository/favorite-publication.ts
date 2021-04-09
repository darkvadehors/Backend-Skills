import { mysqlConnection } from '../config/mysql'
import { Connection, MysqlError } from 'mysql'

// VARIABLE
let sql: string = ''


// STATIC FUNCTIONS


// EXPORT FUNCTIONS
const getAll = (uid:number) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT 
                    u.name AS publication_name,
                    u.firstname AS publication_firstname,
                    p.id AS publication_id,
                    p.title AS publication_title, 
                    p.text AS publication_text, 
                    p.createAt AS publication_date
                FROM favorite_publications fp
                LEFT JOIN publications p 
                    ON fp.publicationId = p.id
                LEFT JOIN users u 
                    ON p.userId = u.id
                WHERE fp.uid = ?
                ORDER BY p.createAt `

        const database = mysqlConnection()

        try {
            database.query(sql, [uid], (err:MysqlError, res) => {
                if(err) reject(err)

                database.end(err => reject(err))

                resolve(res)
            })    
        } catch (error) {
            reject(error)
        }
    })
}

const add = ({id, uid}) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO favorite_publications ( uid, publicationId )
                SELECT ?, ?
                WHERE NOT EXISTS (
                    SELECT 1 FROM favorite_publications WHERE uid= ? AND publicationId= ?
                )`

        const database = mysqlConnection()

        try {
            database.query(sql, [uid, id, uid, id], (err:MysqlError, res) => {
                if(err) reject(err)

                database.end(err => reject(err))

                resolve(res)
            })    
        } catch (error) {
            reject(error)
        }
    })
}

const remove = ({id, uid}) => {
    return new Promise((resolve, reject) => {
        sql = `DELETE FROM favorite_publications WHERE uid= ? AND publicationId= ?`

        const database = mysqlConnection()

        try {
            database.query(sql, [uid, id], (err, res) => {
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
    getAll,
    add,
    remove
}