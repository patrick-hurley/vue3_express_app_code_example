import express from 'express'
const router = express.Router()

import QuestionPolicy from '../policies/QuestionPolicy'
import QuestionController from '../controllers/QuestionController'

/**
 * POST /v1/api/questions
 * @summary Create a question.
 * @tags questions
 * @param {CreateQuestion} request.body.required - application/json
 * @return 200 - Success response - application/json
 */
router.post(
    '/',
    QuestionPolicy.createQuestion,
    QuestionController.createQuestion
)

/**
 * GET /v1/api/questions
 * @summary Get all questions.
 * @tags questions
 * @return {array<Question>} 200 - Success response - application/json
 */
router.get('/', QuestionController.getAllQuestions)

export default router
