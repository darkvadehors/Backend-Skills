import { mysqlConnection } from '../config/mysql'
import { Connection, MysqlError } from 'mysql'


// VARIABLE
let sql: string = ''


// STATIC FUNCTIONS
const getUser = (id: number, token: string) => {
    return new Promise((resolve, reject) => {
        const database = mysqlConnection()

        sql = `SELECT * FROM users WHERE id= ? AND token= ?`

        try {
            database.query(sql, [id, token], (err, res) => {
                if(err) reject(err)
                
                database.end(err => reject(err))

                resolve(res)
            })
        } catch (error) {
            
        }
    })
}

// EXPORT FUNCTIONS
const getUserById = (id: number) => {
    return new Promise((resolve, reject) => {
        const database = mysqlConnection()

        sql = `SELECT * FROM users WHERE id= ?`

        try {
            database.query(sql, [id], (err, res) => {
                if(err) reject(err)
                
                database.end(err => reject(err))

                resolve(res)
            })
        } catch (error) {
            
        }
    })
}

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const database = mysqlConnection()

        sql = `SELECT id, email, name, firstname, createAt, lastConnect FROM users`

        try {
            database.query(sql, (err, rows) => {
                if(err) reject(err)
    
                database.end(err => reject(err))
    
                resolve(rows)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const update = (userId: number, token: string, user: any) => {
    return new Promise((resolve, reject) => {
        getUser(userId, token).then(result => {
            const name = (user.name != result[0].name) ? user.name : result[0].name
            const firstname = (user.firstname != result[0].firstname) ? user.firstname : result[0].firstname
            
            const database = mysqlConnection()

            sql = `UPDATE users SET name= ?, firstname= ? WHERE id= ? AND token= ?`

            try {
                database.query(sql, [name, firstname, userId, token], (err, res) => {
                    if(err) reject(err)

                    database.end(err => reject(err))

                    resolve({
                        message: 'Success update user information',
                        affectedRows: res.affectedRows,
                        user: {
                            userId: userId,
                            email: result[0].email,
                            name: name,
                            firstname: firstname,
                            createAt: result[0].createAt,
                            lastConnect: result[0].lastConnect,
                            token: token
                        }
                    })
                })
            } catch (error) {
                reject(error)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

 
export default {
    getUserById,
    getAllUsers,
    update
}