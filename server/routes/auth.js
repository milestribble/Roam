const auth = require('express').Router();
const fetch = require('node-fetch');
const { oauthActions, userActions } = require('../actions')

auth
  .post('/checkForCredentialsInUse', (req, res) => {
    const { email, username } = req.body;
    Promise.all([
      userActions.checkForEmailInUse(email),
      userActions.checkForUsernameInUse(username),
    ])  
      .then(inUseBooleans =>
        res.json({inUseBooleans: {
          emailInUse: inUseBooleans[0],
          usernameInUse: inUseBooleans[1]
        }}))
  })
  .get('/oauth/:service', (req, res) => {
    const { service } = req.params;
  })
  .post('/submit', (req, res) => {
    const { intent, ...user } = req.body;
    userActions[intent](user)
      .then(payload => {
        res.json(payload)
        console.log(payload);
      })
      .catch(error => {

      })
  })
  .get('/logout', (req, res) => {
    const { sid } = req.cookies;
    userActions.logout(sid)
      .then(sessionRemoved => sessionRemoved
        ? res.json({ loggedout: true })
        : res.json({ loggedout: false })
      )
  })

module.exports = auth;