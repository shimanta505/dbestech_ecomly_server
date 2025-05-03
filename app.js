const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const env = process.env;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
//app.options('/api/*',cors());


const hostname = env.HOST;
const port = env.PORT;

mongoose.set('debug',true);

mongoose.connect(env.MONGODB_CONNECT_STRING).then(()=>{
    console.log("connected to data base");
}).catch((error)=> {
    console.error(error);
});

app.listen(port,hostname,()=> {
    console.log(`server running at http://${hostname}:${port}`);
});