import supertest from 'supertest'
import app from '../app'

describe('Question routes', () => {
    it('Creates a question', async () => {
        const res = await supertest(app).post('/v1/api/questions').send({
            type: 'textarea',
            label: 'How will you solve it?',
            order: 1,
        })
        expect(res.statusCode).toBe(200)
    })
    it('Rejects missing type', async () => {
        const res = await supertest(app).post('/v1/api/questions').send({
            label: 'How will you solve it?',
            order: 1,
        })
        expect(res.statusCode).toBe(400)
    })
    it('Rejects missing label', async () => {
        const res = await supertest(app).post('/v1/api/questions').send({
            type: 'textarea',
            order: 1,
        })
        expect(res.statusCode).toBe(400)
    })
    it('Rejects missing order', async () => {
        const res = await supertest(app).post('/v1/api/questions').send({
            type: 'textarea',
            label: 'How will you solve it?',
        })
        expect(res.statusCode).toBe(400)
    })
    it('Rejects unknown type', async () => {
        const res = await supertest(app).post('/v1/api/questions').send({
            type: 'unknown type',
            label: 'How will you solve it?',
            order: 1,
        })
        expect(res.statusCode).toBe(400)
    })
})
