import cookies from 'js-cookie';

const initPath = window.location.pathname.split('/')[1];
let sentToFrom

const initialAction = {
  type: 'NAVIGATION',
  payload: initPath,
}

function reducer_navigation (state = null, action = initialAction, root) {
  console.log(1, state, action, root)
  switch (action.type) {
    case 'NAVIGATION': {
      if (root.auth.sid === null) {
        switch (action.payload){
          case 'landing': {
            window.history.pushState(null, null, '/')
            return 'landing'
          }
          default: {
            window.history.pushState(null, null, action.payload)
            sentToFrom = action.payload
            return 'login'
          }
        }
      } else {
        switch (action.payload) {
          case 'logout': {
            window.history.pushState(null, null, '/')
            return 'logout'
          }
          default:
            window.history.pushState(null, null, action.payload)
            return action.payload
        }
      }
    }
    case 'UPDATE_USER': {
      switch(action.payload.result) {
        case 'created':
          window.history.pushState(null, null, 'intro')          
          return 'intro'
        case 'verified': {
          const sendBackTo = sentToFrom
          sentToFrom = undefined
          console.log('sendBackTo verif:', sendBackTo || 'landing');
          return sendBackTo || 'landing';
        }
        case 'logout': {
          window.history.pushState(null, null, '/')
          return 'landing';
        }
        default:
          return action.payload
      }
    }
    default:
      return state;
  }
}

export default reducer_navigation
//   return { user: action.payload.user }