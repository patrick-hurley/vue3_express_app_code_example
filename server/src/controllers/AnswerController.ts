import AnswerSet from '../models/AnswerSet'
import Answer from '../models/Answer'
import User from '../models/User'
import Question from '../models/Question'

import { Request, Response } from 'express'

import createAnswerDto, { AnswerCreationPayload } from '../dtos/createAnswer'

class AnswerItem {
    constructor(
        public answerSetId: string,
        public answer: string,
        public questionId: string
    ) {}
}

export async function createAnswerSet(
    req: Request,
    res: Response
): Promise<Response> {
    const { userId, answers } = req.body as createAnswerDto
    const createdAnswerSet = await AnswerSet.create({
        userId,
    })

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
}
export async function getAllAnswers(
    req: Request,
    res: Response
): Promise<Response> {
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
}
export async function getAnswerSet(
    req: Request,
    res: Response
): Promise<Response> {
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
}
