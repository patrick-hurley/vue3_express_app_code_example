import { QuestionAttributes } from '../models/Question'

export default interface createQuestionDto
    extends Omit<QuestionAttributes, 'id'> {}
