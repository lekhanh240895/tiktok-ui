const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/TiktokDB');
        await mongoose.connect(process.env.API_URI);
        console.log('Connect DB successfull !!!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };
