import { mysqlConnection } from '../config/mysql'
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import { hashSync, compareSync} from 'bcrypt'
import { Connection, MysqlError } from 'mysql'

dotenv.config();

// VARIABLE
let sql: string = ''
const jwtSecret: string = process.env.JWT_SECRET

// STATIC FUNCTIONS
/**
 * Get hash password
 * @param password string
 * @returns hash syncron password
 */
const getHashPassword = (password: string): string => {
    return hashSync(password, +process.env.BCRYPT_ROUNDS)
}

/**
 * Compare password with hash password
 * @param password string => post user.password
 * @param hashPassword string => database password
 * @returns boolean
 */
const comparePassword = (password: string, hashPassword:string): boolean => {
    return compareSync(password, hashPassword)
}

/**
 * Get token by JWT where eamil and jwt secret = (variable env)
 * @param email string
 * @returns Object JWT by token id with user and email
 */
const getToken = (email: string): string => {
    return jwt.sign( { user: { email } }, jwtSecret)
}

/**
 * Get user by email
 * @param email string
 * @returns user[]
 */
const getUserByEmail = (email: string): Promise<any[]> => {
    const user: any[] = []

    return new Promise((resolve, reject) => {
        const database: Connection = mysqlConnection()
        
        try {
            sql = `SELECT * FROM users WHERE email= ?`
            
            database.query(sql, [`${email}`], (err: MysqlError, rows) => {
                if (err) {
                    reject(err)
                }

                database.end(err => {if(err) reject(err)})

                user.push(rows[0])

                resolve(user)
            })
        } catch (error) {
            reject(error)
        }
    })
}


// EXPORT FUNCTIONS
/**
 * Signin user with email and password
 * @param user { email:string, password:string}
 * @returns => { message, affectedRows, changedRows, warningCount user:{userId, email, name, firstname, createAt, lastConnect, token}}
 */
const signin = (user: any) => {
    return new Promise((resolve, reject) => {
        // pour pouvoir logger le user il faut en premier déterminer si le user exist
        getUserByEmail(user.email).then(result => {
            if(result[0] != null){
                // si le user exist on le recuper dans un tableau
                const userId: number = parseInt(result[0].id)
                const name: string = result[0].name
                const firstname: string = result[0].firstname
                const token: string = result[0].token
                const createAt: Date = result[0].createAt
                const hashPsw: string = result[0].password
                const isLogged: boolean = true
                const lastConnect = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);
               
                // on compar si le password es correct
                //      - si error return reject 'email and password error'
                if(!comparePassword(user.password, hashPsw))
                    reject({message: 'Email or password not valide!'})

                // on compar la validiter du token
                //      - si error return reject 'user not found'
                const valideToken: Object = jwt.verify(token, jwtSecret)
                if(!valideToken)
                    reject('token error')

                 // si tout es bon on met a jour dans la database lastConnect
                 try {
                    const database: Connection = mysqlConnection()

                    sql = `UPDATE users SET lastConnect = ?, isLogged = ? WHERE email = ?`

                    database.query(sql, [lastConnect, isLogged, user.email], (err: MysqlError, res) => {
                        if(err) reject(err)

                        database.end(err => {if(err) reject(err)})

                        if(res){
                            resolve({
                                userId: userId,
                                email: user.email,
                                name: name,
                                firstname: firstname,
                                createAt: createAt,
                                lastConnect: lastConnect,
                                token: token
                            })
                        }
                        
                    })
                 } catch (error) {
                     reject(error)
                 }
            }
            else {
                // le user n'exist pas
                reject({
                    message: 'Email or password not valide!'
                })
            }
            
        }).catch(err => {
            // getUserByEmail Promis crash
            reject(err)
        })
    })
}

/**
 * Signup User with email and password
 * @param user { email:string, password:string}
 * @returns => { userid, affectedRows, message}
 */
const signup = (user: any) => {
    const email: string = user.email
    const hashPassword: string = getHashPassword(user.password)
    const token = getToken(user.email)
    const isLogged: boolean = false
   
    return new Promise((resolve, reject) =>{
        // CONNECT DATABASE
        const database: Connection = mysqlConnection()

        // insert dans users l'email le password le token pour autent que cette email n'existe pas dans users
        sql = `INSERT INTO users (email, password, token, isLogged )
                SELECT ?, ?, ?, ?
                WHERE NOT EXISTS (
                    SELECT 1 FROM users WHERE email= ?
                )`
                
        try {
            database.query(sql, [`${email}`, `${hashPassword}`, `${token}`, 0, `${email}`], (err:MysqlError, result) => {
                if(err) reject(err)
    
                 database.end(err => {
                    if (err) {
                        reject(err)
                    }
                })
    
                console.log('DEBUG RESULT => ', result);
    
                if(result.affectedRows === 1){
                    //On a bien ajouté un nouveau user
                    resolve({ 
                        userid: result.insertId,
                        affectedRows: result.affectedRows,
                        message: 'User submition success' 
                    })
                }
                else {
                    // user existe déja
                    reject({ message: 'Email exist!' })
                } 
            })
        } catch (error) {
            reject(error)
        }
    })

}

/**
 * 
 * @param token string
 * @param userId number
 * @returns => { 'Loggout' }
 */
const loggout = (token: string, userId: number) => {
    return new Promise((resolve, reject) => {
        // verifie si le user token exist dans jwt
        const valideToken = jwt.verify(token, jwtSecret)
        if(valideToken){
            // on met a jour la database pour le userId
            //      - isLogged => false
            //      - lastConnect => current time
            const isLogged: boolean = false
            const lastConnect = (new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1);

            try {
                const database: Connection = mysqlConnection()

                sql = `UPDATE users SET lastConnect = ?, isLogged = ? WHERE id = ?`

                database.query(sql, [lastConnect, 0, userId], (err: MysqlError, res) => {
                    if (err) {
                        reject(err)
                    }

                    database.end(err => {if (err) {
                        reject(err)
                    }})
                    console.log('backend loggout => ',res);
                    
                    resolve({ message: 'Loggout'})
                })

            } catch (error) {
                reject(error)
            }
            // return string loggout
        }else{
            // error => return 
            reject('Error Autorization!')
        }
    })
}

const isLogged = (uid:number, token:string) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT isLogged FROM users WHERE id= ? AND token= ?`
 
        const database: Connection = mysqlConnection()

        try {
            database.query(sql, [uid, token], (err, res) => {
                if(err) reject(err)

                database.end(err => reject(err))

                console.log('backend isLogged => ', res);
                
                resolve(res)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export default {
    signup,
    signin,
    loggout,
    isLogged
}