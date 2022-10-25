const mongoose = require('mongoose');

async function connect() {
    try {
//         await mongoose.connect('mongodb://localhost:27017/TiktokDB');
        await mongoose.connect(
            'mongodb+srv://lekhanh:rimdaica@123@cluster0.e2zarat.mongodb.net/TikTokDB?retryWrites=true&w=majority',
        );
        console.log('Connect DB successfull !!!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connect };
