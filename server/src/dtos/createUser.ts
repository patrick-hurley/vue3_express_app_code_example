import { UserAttributes } from '../models/User'

export default interface CreateUserDto extends Omit<UserAttributes, 'id'> {}
