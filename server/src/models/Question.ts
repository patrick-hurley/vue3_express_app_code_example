import { sequelize } from '.'
import { DataTypes, Model, Optional } from 'sequelize'


interface QuestionAttributes {
    id: string
    type: string
    label: string
    order: number
}

interface QuestionCreationAttributes
    extends Optional<QuestionAttributes, 'id'> {}

interface QuestionInstance
    extends Model<QuestionAttributes, QuestionCreationAttributes>,
        QuestionAttributes {
    createdAt?: Date
    updatedAt?: Date
}

const Question = sequelize.define<QuestionInstance>('question', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default Question
