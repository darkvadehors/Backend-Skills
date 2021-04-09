import { Router } from 'express'
import * as controller from '../controllers/sample'

export const sampleRoute = Router()

sampleRoute.get('/ping', controller.sampleHandler)