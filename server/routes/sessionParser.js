const { userActions } = require('../actions')

module.exports = (req, res, next) => {
  const { sid } = req.cookies
  sid && userActions.retrieveSession(sid)
  next()
}