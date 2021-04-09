import { Router } from 'express'
import {Request, Response} from 'express'
import logging from '../config/logging'
import jwt from '../shared/jsonwebtoken'
import repo from '../repository/publication'

const jwtSecret: string = process.env.JWT_SECRET
const NAMESPACE = 'Publication Router'
const publication = Router()

// STATIC FUNCTION
const getAll = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Get Publication')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        repo.getAll().then(result => {
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

const addNewPublication = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Get Publication')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    const {userId, title, text} = req.body

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        repo.addNewPublication({userId, title, text}).then(result => {
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

// ROUTES
publication.get('/', getAll)
publication.post('/', addNewPublication)

// EXPORT ROUTER
export default publication