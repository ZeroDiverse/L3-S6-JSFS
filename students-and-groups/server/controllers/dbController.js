// fichier ./controllers/dbConnection.js
const mongoose = require('mongoose');

const dbHost = 'localhost';
const dbPort = 27017;
const dbName = 'student-group';
const dbURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;

const dbConnection = mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

module.exports = dbConnection;        // exporte la connection créée

/*
const dbConnection = mongoose.createConnection(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

module.exports = dbConnection;        // exporte la connection créée
*/
/*
// mise en place des abonnements aux événéments
dbConnection.on('connected',
    () => console.log(`dbConnection.js : connected to ${dbURI}`)
);
dbConnection.on('disconnected', ...);
dbConnection.on('error', ...);

const shutdown = (msg, callback) => {    // fonction pour
    dbConnection.close(                    // fermer proprement la connexion
        () => {
            console.log(` Mongoose shutdown : ${msg}`);
            callback();
        }
    );
}

// code pour gérer proprement le Ctrl+C sous windows et la réception de 'SIGINT'
// nécessite d'installer le module readline : 'npm install readline --save'
(
...)

process.on('SIGINT', () => shutdown('application ends', () => process.exit(0))); // application killed (Ctrl+c)
process.on('SIGTERM', () => shutdown('SIGTERM received', () => process.exit(0)))
)
; // process killed (POSIX)
*/
