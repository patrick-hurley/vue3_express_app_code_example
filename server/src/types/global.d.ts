export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ADMIN_EMAIL: string
            DOMAIN: string
            HOSTING_ENV: 'test' | 'development' | 'staging' | 'production'
            NODE_ENV: 'test' | 'development' | 'staging' | 'production'
            PORT: string
            SEND_EMAIL: string
            EMAIL_HOST: string
            EMAIL_PASS: string
            EMAIL_PORT: string
            EMAIL_USER: string
        }
    }
    interface CustomError extends Error {
        status: number
        err: {
            stack: string
            message: string
        }
        details: string
    }
    var foo: string
}
