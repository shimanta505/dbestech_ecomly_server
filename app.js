const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const authJwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error_handler');

const app = express();
const env = process.env;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(authJwt());
app.use(errorHandler);


const hostname = env.HOST;
const port = env.PORT;
const api = env.API_URL;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
//const adminRouter = require('./routes/admin');

app.use(`${api}/`,authRouter);
app.use(`${api}/users`,userRouter);
//app.use(`${api}/admin`,adminRouter);





mongoose.set('debug',true);

mongoose.connect(env.MONGODB_CONNECT_STRING).then(()=>{
    console.log("connected to data base");
}).catch((error)=> {
    console.error(error);
});

app.listen(port,hostname,()=> {
    console.log(`server running at http://${hostname}:${port}`);
});