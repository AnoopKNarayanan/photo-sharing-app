import * as config from './config/config';
import * as db from './models/db';
import * as passportConfig from './config/passportConfig';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from "passport";

import router from './routes/router';
import fileUpload from 'express-fileupload';

export var app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(fileUpload());
app.use('/api', router);
app.use((err, req, res, next) => {
    if(err.name == 'ValidationError') {
        var validationErrors = [];
        Object.keys(err.errors).forEach(key => validationErrors.push(err.errors[key].message));
        res.status(422).send(validationErrors);
    }
});

app.get('*', function(request, response, next) {
  response.sendFile(__dirname + '/index.html');
});

//server
app.listen(process.env.PORT, function(req, res) {
    console.log(`Server is running at port ${process.env.PORT} \n`);
});
