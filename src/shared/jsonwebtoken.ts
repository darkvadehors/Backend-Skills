import * as jwt from 'jsonwebtoken'

const jwtSecret: string = process.env.JWT_SECRET

const tokenIsValid = (token: string) => {
    return new Promise((resolve, reject) => {
        const valideToken: Object = jwt.verify(token, jwtSecret)

        if (!valideToken) {
            reject({ message: 'Header Authorization Error'})
        } else {
            resolve({ message: 'valid' })
        }   
    })
}

export default {
    tokenIsValid
}