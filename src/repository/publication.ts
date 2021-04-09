import { mysqlConnection } from '../config/mysql'
import { Connection, MysqlError } from 'mysql'

// VARIABLE
let sql: string = ''


// STATIC FUNCTIONS


// EXPORT FUNCTIONS
const getAll = () => {
    return new Promise((resolve, reject) => {
        sql = `SELECT 
                    u.name AS publication_name,
                    u.firstname AS publication_firstname,
                    p.id AS publication_id,
                    p.userId AS publication_userId,
                    p.title AS publication_title, 
                    p.text AS publication_text, 
                    p.createAt AS publication_date
                FROM publications p
                LEFT JOIN users u 
                    ON p.userId = u.id
                ORDER BY p.createAt `

        //sql = 'SELECT id, title, text, createAt FROM publications'
        
        const database: Connection = mysqlConnection()
        
        database.query(sql, (err:MysqlError, res) => {
            if(err) reject(err)

            database.end(err => reject(err))

            resolve(res)
        })
    })
}

const addNewPublication = ({userId, title, text}) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO publications ( userId, title, text )
                SELECT ?, ?, ?
                WHERE NOT EXISTS (
                    SELECT 1 FROM publications WHERE userId= ? AND title= ?
                )`

        const database: Connection = mysqlConnection()
        
        database.query(sql, [userId, title, text, userId, title], (err:MysqlError, res) => {
            if(err) reject(err)

            database.end(err => reject(err))

            resolve(res)
        })
    })
}

export default {
    getAll,
    addNewPublication
}