const swaggerOptions = {
    info: {
        version: '1.0.0',
        title: 'API',
        description: 'Server API documentation',
    },
    filesPattern: './routes/**/**.ts',
    baseDir: './src',
    swaggerUiOptions: {
        swaggerOptions: {
            docExpansion: 'none',
            syntaxHighlight: {
                theme: 'arta',
            },
        },
    },
}

export default swaggerOptions
