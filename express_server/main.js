const express = require('express');
const app = express();
const fs = require('fs');
const helmet = require('helmet');
const bodyPaser = require('body-parser');
const compression = require('compression');
const topicRouter = require('./routes/topic.js');
const indexRouter = require('./routes/index');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyPaser.urlencoded({extended:false}));
app.use(compression());
app.get('*', (request, response, next) => {
    fs.readdir('./data', (error, fileLIst) => {
        request.list = fileLIst;
        next();
    });
})

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('An error has occured');
})

app.use((request, response, next) => {
    response.status(404).send('page not found');
})

app.listen(3000);