import { AnswerCreationAttributes } from '../models/Answer'

interface AnswerCreationPayload extends Omit<AnswerCreationAttributes, 'id'> {}

export default interface createAnswerDto {
    userId: string
    answers: AnswerCreationPayload[]
}
