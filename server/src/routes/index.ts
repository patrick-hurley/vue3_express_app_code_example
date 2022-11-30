import express from 'express'
const router = express.Router()

import Question from './Question'
import User from './User'

router.use('/questions', Question)
router.use('/users', User)

export default router
