import AnswerSet from '../models/AnswerSet'
import Answer from '../models/Answer'
import User from '../models/User'
import Question from '../models/Question'

import logger from '../config/logger'
import { Request, Response } from 'express'

interface Answer {
    answer: string
    questionId: string
}

export default {
    async createAnswerSet(req: Request, res: Response): Promise<Response> {
        logger.info('Creating answer set')

        const { userId, answers } = req.body
        const createdAnswerSet = await AnswerSet.create({
            userId,
        })

        const answerPayload = answers.map((x: Answer) => {
            return {
                answerSetId: createdAnswerSet.id,
                answer: x.answer,
                questionId: x.questionId,
            }
        })

        try {
            await Answer.bulkCreate(answerPayload)
            return res.sendStatus(200)
        } catch (err) {
            return res.sendStatus(500)
        }
    },
    async getAllAnswers(req: Request, res: Response): Promise<Response> {
        logger.info('Getting all answers')
        const userId = req.params.userId
        try {
            const foundUser = await User.findByPk(userId)
            if (!foundUser) {
                return res.sendStatus(404)
            }
            const foundAnswers = await AnswerSet.findAll({
                where: {
                    userId,
                },
                attributes: ['id', ['createdAt', 'date']],
                include: [
                    {
                        model: Answer,
                        attributes: ['id', 'answer'],
                        include: [
                            {
                                model: Question,
                                attributes: ['label'],
                            },
                        ],
                    },
                ],
            })

            return res.status(200).send(foundAnswers)
        } catch (err) {
            return res.sendStatus(500)
        }
    },
    async getAnswerSet(req: Request, res: Response): Promise<Response> {
        logger.info('Getting answer set')
        const { userId, answerSet } = req.params

        console.log({ userId, answerSet })

        try {
            const foundAnswerSet = await AnswerSet.findOne({
                where: {
                    id: answerSet,
                    userId,
                },
                attributes: ['id', ['createdAt', 'date']],
                include: [
                    {
                        model: Answer,
                        attributes: ['id', 'answer'],
                        include: [
                            {
                                model: Question,
                                attributes: ['label'],
                            },
                        ],
                    },
                ],
            })

            if (!foundAnswerSet) {
                return res.sendStatus(404)
            }

            return res.status(200).send(foundAnswerSet)
        } catch (err) {
            return res.sendStatus(500)
        }
    },
}
