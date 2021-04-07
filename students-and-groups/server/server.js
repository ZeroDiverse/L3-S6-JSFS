const colors = require('colors')
const app = require("./app");
const dbConnection = require("./controllers/dbController");

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 8080;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dbConnection.then(() => {
    console.log('Connected to database successfully'.yellow.underline)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`.yellow.underline)
    })
}).catch(e => {
    console.log(e)
})
