require('dotenv').config({ path: '.env.test' })

import { sequelize } from '../models'
import '../models/associations'

beforeAll((done) => {
    sequelize.sync({ force: true, logging: false }).then(() => {
        done()
    })
})

afterAll((done) => {
    sequelize.close().then(() => {
        done()
    })
})
