import Question from '../models/Question'
import logger from '../config/logger'
import { Request, Response } from 'express'

export default {
    async createQuestion(req: Request, res: Response): Promise<Response> {
        logger.info('Creating question')
        const { type, label, order } = req.body
        try {
            const createdQuestion = await Question.create({
                type,
                label,
                order,
            })
            return res.status(200).send({
                id: createdQuestion.id,
            })
        } catch (err) {
            return res.sendStatus(500)
        }
    },
    async getAllQuestions(req: Request, res: Response): Promise<Response> {
        logger.info('Getting all questions')
        try {
            const foundQuestions = await Question.findAll({
                order: [['order', 'ASC']],
                attributes: {
                    exclude: ['updatedAt', 'createdAt'],
                },
            })
            return res.status(200).send(foundQuestions)
        } catch (err) {
            return res.sendStatus(500)
        }
    },
}
