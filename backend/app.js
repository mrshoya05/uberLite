const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const cors = require('cors')

const express = require('express');
const app = express();
const connectToDatabase = require('./db/db')
connectToDatabase();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const userRoutes = require('./routes/user.routes')
const router = require('./routes/captain.routes')
app.get('/', (req, res)=>{
    res.send("Hello uber ! ");
});

app.use('/api/user', userRoutes)
app.use('/api/captain', router);

module.exports = app;