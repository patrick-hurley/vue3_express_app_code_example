import AnswerSet from '../models/AnswerSet'
import Answer from '../models/Answer'
import User from '../models/User'
import Question from '../models/Question'

import logger from '../config/logger'
import { Request, Response } from 'express'

import createAnswerDto, { AnswerCreationPayload } from '../dtos/createAnswer'

class AnswerItem {
    constructor(
        public answerSetId: string,
        public answer: string,
        public questionId: string
    ) {}
}

export default {
    async createAnswerSet(req: Request, res: Response): Promise<Response> {
        logger.info('Creating answer set')

        const { userId, answers } = req.body as createAnswerDto
        const createdAnswerSet = await AnswerSet.create({
            userId,
        })

        // const answerPayload = answers.map((x) => {
        //     return {
        //         answerSetId: createdAnswerSet.id,
        //         answer: x.answer,
        //         questionId: x.questionId,
        //     }
        // })

        let answerPayload: AnswerCreationPayload[] = []
        answers.forEach((obj) => {
            answerPayload.push(
                new AnswerItem(createdAnswerSet.id, obj.answer, obj.questionId)
            )
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
