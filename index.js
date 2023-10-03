const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./src/models');
const routerUser = require('./src/routes/users');

const startApp = async () => {
    const app = express();
    dotenv.config();
    app.use(cors());
    const port = process.env.port || '8000';

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.use('/users', routerUser);


    try {
        await db.sequelize.sync({ force: false });
        app.listen(port, () => {
            console.log('APP running on port ' + port);
        });
    } catch (error) {
        console.log('Error at start up the App' + error.message);
        process.exit(1);
    }
};

startApp();
