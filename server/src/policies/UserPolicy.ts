import Joi from 'joi'
import * as ErrorUtility from '../utility/ErrorUtility'
import * as FormatUtility from '../utility/FormatUtility'

import { Request, Response, NextFunction } from 'express'

export default {
    createUser(req: Request, res: Response, next: NextFunction) {
        try {
            req.body = FormatUtility.trimAndNullObjectProperties(req.body)

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
