import { sequelize } from '.'
import { DataTypes, Model, Optional } from 'sequelize'


interface AnswerAttributes {
    id: string
    answer: string
    questionId: string
    answerSetId: string
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

interface AnswerInstance
    extends Model<AnswerAttributes, AnswerCreationAttributes>,
        AnswerAttributes {
    createdAt?: Date
    updatedAt?: Date
}

const Answer = sequelize.define<AnswerInstance>('answer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    questionId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    answerSetId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
})

export default Answer
