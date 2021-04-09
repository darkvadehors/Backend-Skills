import { Router } from 'express'
import {Request, Response} from 'express'
import logging from '../config/logging'
import jwt from '../shared/jsonwebtoken'
import repo from '../repository/favorite-users'

const jwtSecret: string = process.env.JWT_SECRET
const NAMESPACE = 'Favorite Users Router'
const favUsers = Router()

// STATIC FUNCTION
const add = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Add Favorite User')

    if (req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({message: 'Header Authorization Missing'})
    }

    jwt.tokenIsValid(req.headers.authorization).then(result => {
        const { uid, favoriteId } = req.body
        
        repo.add({ uid, favoriteId }).then(result => {
            res.status(200).json(result)
        }).catch(error => {
            logging.error(NAMESPACE, error)
            res.status(404).json({message: error})
        })
    }).catch(error => {
        logging.error(NAMESPACE, error)
        return res.status(404).json({message: error})
    })
}


// ROUTES
favUsers.post('/', add)


// EXPORT ROUTER
export default favUsers