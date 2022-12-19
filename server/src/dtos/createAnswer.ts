import { AnswerCreationAttributes } from '../models/Answer'

export interface AnswerCreationPayload
    extends Omit<AnswerCreationAttributes, 'id'> {}

export default interface createAnswerDto {
    userId: string
    answers: AnswerCreationPayload[]
}
