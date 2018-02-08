const bcrypt = require('bcrypt');
const saltRounds = 10;

const { db } = require('../db/client')


module.exports = {

  create: (userInput) => {
    let {password, ...user} = userInput; 
    return bcrypt.hash(password, saltRounds)
      .then(encrypted_password => db.one(`INSERT INTO users (first_name, last_name, username, email, encrypted_password)
        VALUES ($/first_name/, $/last_name/, $/username/, $/email/, $/encrypted_password/ )
        RETURNING first_name, last_name, username, email`, { encrypted_password, ...user }))
      .then(user => ({ user, result: 'created' }))
  },

  login: (userInput) => {
    let {password, ...user} = userInput; 
    return db.one(`SELECT * FROM users WHERE email = $/email/`, user)
      .then(db => bcrypt.compare(password, db.encrypted_password))
      .then(res => res
        ? { user, result: 'verified' }
        : { result: 'invalid'}
      )
  },
}
  // saveUserToken: (encryptedToken, googleid) =>
  //   query(`INSERT INTO
  //           tokens (googleid, encrypted_token)
  //         VALUES
  //           ($2, $1)
  //         ON CONFLICT
  //           ("googleid")
  //         DO UPDATE
  //         SET
  //           "encrypted_token" = EXCLUDED."encrypted_token"
  //         RETURNING
  //           googleid`,
  //     [encryptedToken, googleid])
  //     .then((results) => {
  //       if (results.length === 0) {
  //         throw new Error('Problem saving the new token');
  //       } else {
  //         return results[0].googleid;
  //       }
  //     }),

  // destroyUserToken: googleId =>
  //   query(`DELETE FROM
  //           tokens
  //         WHERE
  //           googleid = $1`,
  //     [googleId])
  //     .then((results) => {
  //       if (results.length === 0) {
  //         throw new Error(`Problem delete the given token: ${googleId}`);
  //       } else {
  //         return results;
  //       }
  //     }),

  // storeState: state =>
  //   query(`INSERT INTO
  //           state (state)
  //         VALUES
  //           ($1)
  //         RETURNING
  //           state`,
  //     [state])
  //     .then((results) => {
  //       if (results.length === 0) {
  //         throw new Error('Problem saving the state token');
  //       } else {
  //         return results[0].state;
  //       }
  //     }),

  // associateState: (state, googleId) =>
  //   query(`UPDATE
  //           state
  //         SET
  //           googleid = $2
  //         WHERE
  //           state = $1
  //         RETURNING
  //           googleid`,
  //     [state, googleId])
  //     .then((results) => {
  //       if (results.length === 0) {
  //         throw new Error('Problem associating the state token');
  //       } else {
  //         return results[0].googleid;
  //       }
  //     }),

//   getIdAndTokenByState: state =>
//     query(`SELECT
//             tokens.encrypted_token,
//             tokens.googleid
//           FROM
//             tokens
//           JOIN
//             state
//           ON
//             state.googleid = tokens.googleid
//           WHERE
//             state.state = $1`,
//       [state])
//       .then((results) => {
//         if (results.length === 0) {
//           return results;
//           // throw new Error(`REAUTHORIZE`);
//           // throw new Error(`Problem getting googleId from state: ${state}`);
//         } else {
//           return { id: results[0].googleid, encryptedToken: results[0].encrypted_token };
//         }
//       }),
// };
