const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./app/main.js']

swaggerAutogen(outputFile, endpointsFiles)