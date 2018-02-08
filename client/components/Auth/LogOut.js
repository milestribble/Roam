import React, { Component } from 'react';
import { apiFetch } from '../../assistants';
import cookies from 'js-cookie';

class LogOut extends Component {
  componentDidMount() {
    apiFetch('auth/logout', 'GET' )
      .then(({loggedout}) => loggedout && this.props.saveUser({result: 'logout'}))
  }

  render() {
    return (<div />)
  }
}

export default LogOut