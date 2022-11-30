import supertest from 'supertest'
import app from '../app'
import Question from '../models/Question'
import User from '../models/User'

const questions = [
    {
        id: '8d4e48d9-c60f-4636-87a3-22028a523942',
        type: 'text',
        label: 'What is the task?',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '8d4e48d9-c60f-4636-87a3-22028a523943',
        type: 'radio',
        label: 'Can it be solved?',
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '8d4e48d9-c60f-4636-87a3-22028a523944',
        type: 'textarea',
        label: 'How will it be resolved?',
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const answers = [
    {
        questionId: questions[0].id,
        answer: 'Answer 1',
    },
    {
        questionId: questions[1].id,
        answer: 'Answer 2',
    },
    {
        questionId: questions[2].id,
        answer: 'Answer 3',
    },
]

let createdUser: any

describe('User routes', () => {
    beforeAll(async () => {
        Question.bulkCreate(questions)
        createdUser = await User.create({
            name: 'Person 1',
        })
    })
    it('Creates a user', async () => {
        const res = await supertest(app).post('/v1/api/users').send({
            name: 'Person 2',
        })
        expect(res.statusCode).toBe(200)
    })
    it('Rejects when user name is not provided', async () => {
        const res = await supertest(app).post('/v1/api/users').send()
        expect(res.statusCode).toBe(400)
    })
    it('Gets all users', async () => {
        await supertest(app).post('/v1/api/users').send({
            name: 'Person 3',
        })

        const res = await supertest(app).get('/v1/api/users').send()

        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(3)
        expect(res.body[0].name).toBe('Person 1')
        expect(res.body[1].name).toBe('Person 2')
        expect(res.body[2].name).toBe('Person 3')
    })
    it('Accepts an answer to a question', async () => {
        const res = await supertest(app)
            .post(`/v1/api/users/${createdUser.id}/answers`)
            .send({
                userId: createdUser.id,
                answers,
            })
        expect(res.statusCode).toBe(200)
    })
    it('Gets all answers by a user', async () => {
        const res = await supertest(app).get(
            `/v1/api/users/${createdUser.id}/answers`
        )
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(1)
    })
    it('Gets a single answer set', async () => {
        const answersResponse = await supertest(app).get(
            `/v1/api/users/${createdUser.id}/answers`
        )
        const res = await supertest(app).get(
            `/v1/api/users/${createdUser.id}/answers/${answersResponse.body[0].id}`
        )
        expect(res.statusCode).toBe(200)
        expect(res.body.answers[0].answer).toBe('Answer 1')
    })
})
