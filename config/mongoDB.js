const mongoose = require('mongoose');


const mongoDB = async function(config) {
    try {
        await mongoose.connect(config.db);
        console.log('DB connected');
    } catch (error) {
        console.error('Wadh gabisa konek wak: ', error)
    }
}

module.exports = mongoDB;