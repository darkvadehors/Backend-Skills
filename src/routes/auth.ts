import { Router } from 'express'
import {Request, Response} from 'express'
import logging from '../config/logging'
import repo from '../repository/auth'
import jwt from '../shared/jsonwebtoken'

const NAMESPACE = 'Auth Router'
const auth = Router()

// STATIC FUNCTION
/**
 * Signin User
 * @param req { email:string, password:string }
 * @param res Json and status
 */
const signin = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Signin User')
    const { email, password } = req.body

    if(email != null && password != null){
        repo.signin({ email, password }).then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, 'Signin Error', error)
            res.status(404).json(error)
        })
    }else{
        logging.error(NAMESPACE, 'Signin Error email and password missing')
        res.status(404).json({ message: 'email and password missing'})
    }
}

/**
 * Signup User
 * @param req { email:string, password:string }
 * @param res Json and status
 */
const signup = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Signup User')
    const { email, password } = req.body

    if(email != '' && password != ''){
        repo.signup({ email, password }).then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, 'Signup Error', error)
            res.status(404).json(error)
        })
    }
    else{
        logging.error(NAMESPACE, 'Signup Error email and password missing')
        res.status(404).json({ message: 'email and password missing prout'})
    }
}

/**
 * Loggout User
 * @param req token:string => request headers autorization and userId:number => request params
 * @param res => { 'Loggout' }
 */
const loggout = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Loggout User')

    const token: string = req.headers['authorization']
    const userId: number = parseInt(req.params.id)

    if(token != '' && userId > 0){
        repo.loggout(token, userId).then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, 'Loggout Error', error)
            res.status(404).json(error)
        })
    }else{
        logging.error(NAMESPACE, 'Loggout Error authorization and id')
        res.status(404).send('Error authorization and id')
    }
}

const isLogged = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Get Favorite Publications')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        repo.isLogged(parseInt(req.params.id), req.headers.authorization).then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, 'IsLogged Error', error)
            res.status(404).json(error)
        })
    }).catch(error => {
        logging.error(NAMESPACE, error)
        return res.status(404).json({ message: error})
    })
}


// ROUTES
auth.post('/signin', signin)
auth.post('/signup', signup)
auth.get('/loggout/:id', loggout)
auth.get('/isLogged/:id', isLogged)

// EXPORT ROUTER
export default auth