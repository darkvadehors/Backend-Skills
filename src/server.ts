import * as http from 'http'
import * as express from 'express'
import * as helmet from 'helmet'
import * as hpp from 'hpp'
import * as cors from 'cors'
import logging from './config/logging'
import config from './config/config'
import { sampleRoute } from './routes/sample'
import auth from './routes/auth'
import user from './routes/user'
import publication from './routes/publication'
import favPublication from './routes/favorite-publication'
import favUsers from './routes/favorite-users'


const NAMESPACE: string = 'Server'
const api = express()

/** LOGGING THE REQUEST */
api.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP: [${req.socket.remoteAddress}], PORT: [${req.socket.remotePort}]`)

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP: [${req.socket.remoteAddress}], PORT: [${req.socket.remotePort}], STATUS - [${res.statusCode}]`)
    })

    next()
})

/** PARSE THE REQUEST USING EXPRESS JS AND NOT BODYPARSER NPM*/
api.use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(helmet())
    .use(hpp())
    .use(cors())

/** Routes */
api.use('/sample', sampleRoute)
    .use('/auth', auth)
    .use('/user', user)
    .use('/publications', publication)
    .use('/favPublications', favPublication)
    .use('/favUsers', favUsers)


/** ERROR HANDLING */
api.use((req, res, next) => {
    const error = new Error('not found!')

    return res.status(404).json({
        message: error.message
    })
})

/** CREATE THE SERVER */
const httpServer = http.createServer(api)
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))