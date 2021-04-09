import {Request, Response} from 'express'
import logging from '../config/logging'

const NAMESPACE = 'Sample Controller'

const sampleHandler = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Sample Handler check route called')

    return res.status(200).json({
        message: 'pong les filles'
    })
}

export {
    sampleHandler
}