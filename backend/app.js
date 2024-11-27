const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const app = express();
const connectToDatabase = require('./db/db')
connectToDatabase();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const userRoutes = require('./routes/user.routes')

app.get('/', (req, res)=>{
    res.send("Hello uber ! ");
});

app.use('/api/user', userRoutes)

module.exports = app;