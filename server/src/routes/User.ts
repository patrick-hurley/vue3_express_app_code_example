import express from 'express'
const router = express.Router()

import AnswerController from '../controllers/AnswerController'
import AnswerPolicy from '../policies/AnswerPolicy'

import UserPolicy from '../policies/UserPolicy'
import UserController from '../controllers/UserController'

/**
 * POST /v1/api/users
 * @summary Create a user.
 * @tags users
 * @param {CreateUser} request.body.required - application/json
 * @return 200 - Success response - application/json
 */
router.post('/', UserPolicy.createUser, UserController.createUser)

/**
 * GET /v1/api/users
 * @summary Get all users.
 * @tags users
 * @return {array<User>} 200 - Success response - application/json
 */
router.get('/', UserController.getAllUsers)

/**
 * POST /v1/api/users/{userId}/answers
 * @summary Answer a question.
 * @tags answers
 * @param {CreateAnswer} request.body.required - application/json
 * @return 200 - Success response - application/json
 */
router.post(
    '/:userId/answers',
    AnswerPolicy.createAnswerSet,
    AnswerController.createAnswerSet
)

/**
 * GET /v1/api/users/{userId}/answers/
 * @summary Get all answers.
 * @tags answers
 * @return {array<Answer>} 200 - Success response - application/json
 */
router.get(
    '/:userId/answers',
    AnswerPolicy.getAllAnswers,
    AnswerController.getAllAnswers
)

/**
 * GET /v1/api/users/{userId}/answers/{answerSet}
 * @summary Get answer set.
 * @tags answers
 * @return {Answer} 200 - Success response - application/json
 */
router.get(
    '/:userId/answers/:answerSet',
    AnswerPolicy.getAnswerSet,
    AnswerController.getAnswerSet
)

export default router
