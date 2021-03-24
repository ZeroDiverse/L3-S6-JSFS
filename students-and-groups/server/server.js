const colors = require('colors')
const app = require("./app");
const dbConnection = require("./controllers/dbController");

const PORT = process.env.PORT || 3000;

dbConnection.then(() => {
    console.log('Connected to database successfully'.yellow.underline)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`.yellow.underline)
    })
}).catch(e => {
    console.log(e)
})
