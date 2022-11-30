// Enable dotenv
import dotenv from 'dotenv'
dotenv.config()

import { sequelize } from './models'
import './models/associations'
import app from './app'

// logging
import prettyerror from 'pretty-error'
prettyerror.start()
import colors from 'colors'
colors.enable()
import logger from './config/logger'

process.on('warning', (e) => logger.warn(e.stack))

/*
-------------------------------
Start server
-------------------------------
*/
sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT, async () => {
            console.log(
                '\n\n🐠 ' + `Server started on port: ${process.env.PORT}`
            )
            console.log('🌵 ' + `Environment: ${process.env.HOSTING_ENV}`)
            console.log(
                '📪 ' +
                    `Email sending: ${
                        parseInt(process.env.SEND_EMAIL) ? 'on' : 'off'
                    }\n\n`
            )
        })
    })
    .catch((err: Error) => {
        console.log(err)
    })
