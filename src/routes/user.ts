import { Router } from 'express'
import {Request, Response} from 'express'
import logging from '../config/logging'
import jwt from '../shared/jsonwebtoken'
import repo from '../repository/user'

const jwtSecret: string = process.env.JWT_SECRET
const NAMESPACE = 'User Router'
const user = Router()

// STATIC FUNCTION
const getlUser = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Get User')

    console.log();
    

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }    

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        repo.getUserById(parseInt(req.params.id)).then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, error)
            res.status(404).json({ message: error})
        })
    }).catch(error => {
        logging.error(NAMESPACE, error)
        return res.status(404).json({ message: error})
    })
}

const getAllUsers = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Get all users')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }    

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        repo.getAllUsers().then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, error)
            res.status(404).json({ message: error})
        })
    }).catch(error => {
        logging.error(NAMESPACE, error)
        return res.status(404).json({ message: error})
    })
}

const updateUser = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Update user information')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        const userId: number = parseInt(req.params.id)
        const { name, firstname } = req.body
        
        if(!name || !firstname){
            logging.error(NAMESPACE, 'Name or firstname missing')
            return res.status(404).json({ message: 'Name or firstname missing'})
        }
        
        repo.update(userId, req.headers.authorization, { name, firstname }).then((result) => {
            res.status(200).json(result)
        }).catch((error) => {
            logging.error(NAMESPACE, error)
            res.status(404).json({ message: error})
        });

    }).catch(error => {
        logging.error(NAMESPACE, error)
        return res.status(404).json({ message: error})
    })
}

// ROUTES
user.get('/:id', getlUser)
user.get('/', getAllUsers)
user.post('/:id', updateUser)

// EXPORT ROUTER
export default user