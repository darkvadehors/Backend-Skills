import { Router } from 'express'
import {Request, Response} from 'express'
import logging from '../config/logging'
import jwt from '../shared/jsonwebtoken'
import repo from '../repository/favorite-publication'

const jwtSecret: string = process.env.JWT_SECRET
const NAMESPACE = 'Favorite Publication Router'
const favPublication = Router()

// STATIC FUNCTION
const getAll = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Get Favorite Publications')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        const uid: number = parseInt(req.params.id)
        
        repo.getAll(uid).then(result => {
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

const add = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Add Favorite Publications')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        const {id, uid} = req.body

        if({id, uid}){
            repo.add({id, uid}).then(result => {
                res.status(200).json(result)
            }).catch(error => {
                logging.error(NAMESPACE, error)
                res.status(404).json({ message: error})
            })
        }
    }).catch(error => {
        logging.error(NAMESPACE, error)
        return res.status(404).json({ message: error})
    })
}

const remove = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Delete Favorite Publications')

    if(req.headers.authorization === undefined) {
        logging.error(NAMESPACE, 'Header Authorization Missing')
        return res.status(404).json({ message: 'Header Authorization Missing'})
    }  

    jwt.tokenIsValid(req.headers.authorization).then(_ => {
        const { id, uid } = req.body
        console.log({ id, uid });
        
        repo.remove({ id, uid }).then(result => {
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
favPublication.post('/', add)
favPublication.get('/:id', getAll)
favPublication.delete('/', remove)

// EXPORT ROUTER
export default favPublication