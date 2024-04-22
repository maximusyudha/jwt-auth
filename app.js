const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/config')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const mongoDB = require('./config/mongoDB')

const corsOption = {
    origin: "*"
}

const app = express();

app.use(cors(corsOption))

app.use(bodyParser.json());

mongoDB(config)
    .then(() => {
        app.use('/api/user', userRoutes)
        app.listen(3000, () => {
            console.log('Nah server dah konek nih di port 3000')
        });
    })
    .catch(err => {
        console.error('Waduh error nih coba cek: ', err)
    })