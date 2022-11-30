import { sequelize } from '.'
import { DataTypes, Model, Optional } from 'sequelize'
import User from './User'
import Answer from './Answer'

interface AnswerSetAttributes {
    id: string
    userId: string
}

interface AnswerSetCreationAttributes
    extends Optional<AnswerSetAttributes, 'id'> {}

interface AnswerSetInstance
    extends Model<AnswerSetAttributes, AnswerSetCreationAttributes>,
        AnswerSetAttributes {
    createdAt?: Date
    updatedAt?: Date
}

const AnswerSet = sequelize.define<AnswerSetInstance>('answerSet', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
})

export default AnswerSet
