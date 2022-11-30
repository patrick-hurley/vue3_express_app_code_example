import Joi from 'joi'
import ErrorUtility from '../utility/ErrorUtility'
import MiscUtility from '../utility/MiscUtility'

import { Request, Response, NextFunction } from 'express'

export default {
    createUser(req: Request, res: Response, next: NextFunction) {
        try {
            req.body = MiscUtility.trimAndNullObjectProperties(req.body)

            const schema = Joi.object({
                name: Joi.string().required(),
            }).required()

            const { error } = schema.validate(req.body, {
                abortEarly: false,
            })

            if (error) {
                ErrorUtility.reject(error, res)
                return
            }

            next()
        } catch (err: any) {
            ErrorUtility.reject('Validation failure', res, err)
        }
    },
}
