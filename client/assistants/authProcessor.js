import { apiFetch } from '../assistants'; 

export default (() => {
  let authStore = {};

  const getEmail = () => authStore.email;
  
  const checkForCredentialsInUse = (email, username) =>
    apiFetch('auth/checkForCredentialsInUse', 'POST', JSON.stringify({ email , username }))
      .then(({ inUseBooleans }) => inUseBooleans )

  const setIntent = (intent) =>
    authStore.intent = intent;
  

  const record = (SerializedArray) =>
    SerializedArray.forEach(({ name, value }) =>
      authStore[name] = value)

  const submit = (password) => new Promise((resolve, reject) =>
    apiFetch('auth/submit', 'POST', JSON.stringify({ ...authStore, password }))
      .then(res => {
        if (res.result === 'verified' || res.result === 'created') {
          authStore = {};
          resolve(res);
        } else {
          reject('Incorrect Password');
        }
      }))

  const verifyAndSaveValues = (SerializedArray) => new Promise((resolve, reject) => {
    const { intent } = authStore;
    const email = SerializedArray.reduce((acu, { name, value }) => name === 'email' ? value : acu)
    const username = SerializedArray.reduce((acu, { name, value }) => name === 'username' ? value : acu)
    if (intent === 'create') {
      checkForCredentialsInUse(email, username)
        .then(({ emailInUse, usernameInUse }) => {
          if (emailInUse) {
            reject('The email you provided is already in use.');
          } else if (usernameInUse){
            reject('The username you provided is already in use.');
          } else {  
            record(SerializedArray);
            resolve();
          }
        })
    } else if (intent === 'login') {
      record(SerializedArray);
      resolve();
    } 
  })

  return {
    getEmail,
    setIntent,
    verifyAndSaveValues,
    submit,
  }
})()