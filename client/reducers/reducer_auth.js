import cookies from 'js-cookie';
import { apiFetch } from '../assistants';

export default function (state = { sid: cookies.get('sid') ? true : null }, action, root) {
  switch (action.type) {
    case 'UPDATE_USER': {
      switch (action.payload.result) {
        case 'verified':
        case 'created': {
          cookies.set('sid', action.payload.sid)
          return { sid: action.payload.sid }          
        }
        case 'logout': {
          cookies.remove('sid')
          return { sid: null }
        }
        default: {
          return { sid: action.payload.sid }          
        }
      }
    }  
    default:
      return state
  }
}
