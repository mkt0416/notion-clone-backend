
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./src/api/v1/db/connect');

app.use(cors());
app.use(express.json());
app.use('/api/v1', require('./src/api/v1/routes'));

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Listening on localhost port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();



