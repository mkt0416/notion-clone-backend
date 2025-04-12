
const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('Success: Connected to MongoDB');
    } catch (err) {
        console.log('Failure: Unconnected to MongoDB', err);
    }
};

module.exports = connectDB;