import {Request, Response} from 'express'
import logging from '../config/logging'
import repo from '../repository/auth'

const NAMESPACE = 'Auth Controller'

const signinController = (req: Request, res: Response) => {
    const { email, password } = req.body

    repo.signin({ email, password }).then(result => {
        logging.debug(NAMESPACE, 'Log signin after sql response', result)
        res.status(200).json(result)
    }).catch(error => {
        res.status(404).json(error)
    })
}

const signupController = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Signin check route called', req.body)

    const { email, password } = req.body

    console.log('Log email and paswword in controller => ', email + ' - ' + password);

    repo.signup({ email, password }).then(result => {
        logging.debug(NAMESPACE, 'Log value after sql response', result)
        res.status(200).json(result)

    }).catch(err => {
        res.status(404).json(err)
    })
}

const loggoutController = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'Loggout check route called')

    const token: string = req.headers['authorization']
    const userId: number = parseInt(req.params.id)

    if(token != '' && userId > 0){
        repo.loggout(token, userId).then(result => {
            logging.debug(NAMESPACE, 'Log Loggout after sql response', result)
            res.status(200).json(result)

        }).catch(err => {
            res.status(404).json(err)
        })
    }else{
        res.status(404).send('Error authorization and id')
    }
}

export default {
    signinController,
    signupController,
    loggoutController
}