import { Sequelize } from 'sequelize'
const env = process.env.NODE_ENV
const con = require('../config/config')
const config: any = con[env]

const sequelize =
    env === 'production'
        ? new Sequelize(config.database, {
              dialect: config.dialect,
              host: config.host,
              logging: false,
          })
        : new Sequelize(config.database, config.username, config.password, {
              host: config.host,
              dialect: config.dialect,
              logging: false,
          })

export { Sequelize, sequelize }
