import Question from '../models/Question'
import { Request, Response } from 'express'
import createQuestionDto from '../dtos/createQuestion'

class QuestionItem {
    constructor(
        public type: string,
        public label: string,
        public order: number
    ) {}
}

export default {
    async createQuestion(req: Request, res: Response): Promise<Response> {
        const { type, label, order } = req.body as createQuestionDto

        try {
            const createdQuestion = await Question.create(
                new QuestionItem(type, label, order)
            )
            return res.status(200).send({
                id: createdQuestion.id,
            })
        } catch (err) {
            return res.sendStatus(500)
        }
    },
    async getAllQuestions(req: Request, res: Response): Promise<Response> {
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
