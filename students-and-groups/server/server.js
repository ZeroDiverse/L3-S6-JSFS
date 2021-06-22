const colors = require('colors')
const app = require("./app");
const dbConnection = require("./controllers/dbController");

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 8080;


//API documenation live on endpoint/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Create connection to database and then open server
dbConnection.then(() => {
    console.log('Connected to database successfully'.yellow.underline)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`.yellow.underline)
    })
}).catch(e => {
    console.log(e)
})
