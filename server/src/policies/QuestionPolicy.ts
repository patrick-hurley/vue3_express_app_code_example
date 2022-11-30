import Joi from 'joi'
import ErrorUtility from '../utility/ErrorUtility'
import MiscUtility from '../utility/MiscUtility'

import { Request, Response, NextFunction } from 'express'

export default {
    createQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            req.body = MiscUtility.trimAndNullObjectProperties(req.body)

            const schema = Joi.object({
                type: Joi.string().required(),
                label: Joi.string().required(),
                order: Joi.number().required(),
            }).required()

            const { error } = schema.validate(req.body, {
                abortEarly: false,
            })

            if (error) {
                ErrorUtility.reject(error, res)
                return
            }

            if (
                req.body.type !== 'textarea' &&
                req.body.type !== 'text' &&
                req.body.type !== 'radio'
            ) {
                ErrorUtility.reject('Type not allowed', res)
                return
            }

            next()
        } catch (err: any) {
            ErrorUtility.reject('Validation failure', res, err)
        }
    },
}
