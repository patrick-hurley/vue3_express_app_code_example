import Answer from './Answer'
import AnswerSet from './AnswerSet'
import User from './User'
import Question from './Question'

Answer.belongsTo(AnswerSet)
AnswerSet.hasMany(Answer)
AnswerSet.belongsTo(User)
User.hasMany(AnswerSet)
Answer.belongsTo(Question)
Question.hasOne(Answer)
