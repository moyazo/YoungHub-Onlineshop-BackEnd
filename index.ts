import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

const startApp = () => {
    dotenv.config();
    app.use(cors());
    const port = process.env.port || 8000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    try {
        app.listen(port, () => {
            console.log('APP running on port ' + port);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startApp();
