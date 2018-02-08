const express = require('express');
const api = express.Router();
const fetch = require('node-fetch');
const auth = require('./auth.js');

api
  .use('/auth', auth)
  .post('/contact', (req, res) => {
    const { name, email, message } = req.body;
  })
  .post('/contact', (req, res) => {
    const {name, email, message} = req.body;
  })
  .get('/medium', (req, res) => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fqueers-in-tech')
      .then(stream => stream.json())
      .then((json) => {

        json.items = json.items.map((item, index) => {
          if (index===0) {console.log('\n\n',item)}
          return item
        })
        res.json(json)
      })
  })


module.exports = api;