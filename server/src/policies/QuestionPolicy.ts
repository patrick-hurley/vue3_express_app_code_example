import Joi from 'joi'
import * as ErrorUtility from '../utility/ErrorUtility'
import * as FormatUtility from '../utility/FormatUtility'

import { Request, Response, NextFunction } from 'express'

export default {
    createQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            req.body = FormatUtility.trimAndNullObjectProperties(req.body)

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
