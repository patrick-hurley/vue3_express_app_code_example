import { sequelize } from '.'
import { DataTypes, Model, Optional } from 'sequelize'

interface UserAttributes {
    id: string
    name: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    createdAt?: Date
    updatedAt?: Date
}

const User = sequelize.define<UserInstance>('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export default User
