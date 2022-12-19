import User from '../models/User'
import { Request, Response } from 'express'
import createUserDto from '../dtos/createUser'

class UserItem {
    constructor(public name: string) {}
}

export default {
    async createUser(req: Request, res: Response): Promise<Response> {
        const { name } = req.body as createUserDto
        try {
            const createdUser = await User.create(new UserItem(name))
            return res.status(200).send({
                id: createdUser.id,
            })
        } catch (err) {
            return res.sendStatus(500)
        }
    },
    async getAllUsers(_req: Request, res: Response): Promise<Response> {
        try {
            const foundUsers = await User.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
            return res.status(200).send(foundUsers)
        } catch (err) {
            return res.sendStatus(500)
        }
    },
}
