import Joi from 'joi'
import ErrorUtility from '../utility/ErrorUtility'
import MiscUtility from '../utility/MiscUtility'

import { Request, Response, NextFunction } from 'express'

export default {
    createAnswerSet(req: Request, res: Response, next: NextFunction) {
        try {
            req.body = MiscUtility.trimAndNullObjectProperties(req.body)

            const answer = Joi.object().keys({
                questionId: Joi.string().uuid().required(),
                answer: Joi.string().required(),
            })

            const schema = Joi.object({
                userId: Joi.string().uuid().required(),
                answers: Joi.array().items(answer),
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
    getAllAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const schema = Joi.string().uuid().required()

            const { error } = schema.validate(req.params.userId, {
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
    getAnswerSet(req: Request, res: Response, next: NextFunction) {
        try {
            const schema = Joi.object({
                userId: Joi.string().uuid().required(),
                answerSet: Joi.string().uuid().required(),
            })

            const { error } = schema.validate(req.params, {
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
