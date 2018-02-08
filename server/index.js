const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api')
// const schedule = require('node-schedule')
const sessionParser = require('./routes/sessionParser');

const port = process.env.PORT || 5000;

express()
  .use(express.static('./client/app/assets'))
  .use(express.json())
  .use(cookieParser())
  .use(sessionParser)
  .use((req, res, next) => {
    console.log(req.url);
    next();
  })
  .use(express.static(path.join(__dirname,'../public')))
  .use('/_api', apiRouter)
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  .listen(port, () => console.log(`Server started on port ${port}`))