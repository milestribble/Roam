const bcrypt = require('bcrypt');
const saltRounds = 10;

const { db } = require('../db/client')

const createSession = (userId) =>
  db.one(`INSERT INTO users_sessions (users_id) VALUES ($1) RETURNING id`, userId)


module.exports = {
  checkForEmailInUse: (email) => db.oneOrNone(`SELECT COUNT(email) FROM users WHERE email = $1`, email)
    .then(({ count }) => count==='0' ? false : true),
  
  checkForUsernameInUse: (username) => db.oneOrNone(`SELECT COUNT(username) FROM users WHERE username = $1`, username)
    .then(({ count }) => count==='0' ? false : true),

  retrieveSession: (sid) =>
    db.oneOrNone(`SELECT * FROM users 
      JOIN users_sessions ON users_sessions.users_id = users.id 
      WHERE users_sessions.id = $1`, sid)
        .then(console.log),
  create: (userInput) => {
    console.log(userInput)
    let {password, ...user} = userInput; 
    return bcrypt.hash(password, saltRounds)
      .then(encrypted_password => db.one(`INSERT INTO users (first_name, last_name, username, email, encrypted_password)
        VALUES ($/first_name/, $/last_name/, $/username/, $/email/, $/encrypted_password/ )
        RETURNING id, first_name, last_name, username, email`, { encrypted_password, ...user }))
      .then(user => createSession(user.id))
      .then(session => ({ sid: session.id, result: 'created'}))
      .catch(console.log)
  },
  login: (userInput) => {
    let {password, ...user} = userInput; 
    return db.one(`SELECT * FROM users WHERE email = $/email/`, user)
      .then(user => bcrypt.compare(password, user.encrypted_password)
        .then(isCorrectPassword => {
          console.log(isCorrectPassword);
          
          if (!isCorrectPassword) {
            return { result: 'invalid' }
          }
          return createSession(user.id)
            .then(session => ({ sid: session.id, result: 'verified' }))
        })   
      )
  },

  logout: (sid) => {
    return db.result(`DELETE FROM users_sessions WHERE id = $1`, sid)
      .then(({rowCount}) => rowCount)
  },
}
