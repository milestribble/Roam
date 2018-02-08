import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../actions/index';
import { Icon } from '../components';

class Header extends React.Component {
  componentDidMount() {
    const initPath = window.location.pathname.split('/')[1];
    this.props.navigateTo(initPath)
  }
  render () {
    const buildIcon = (display, to, className) => (
      <Icon
        display={display}
        click={() => this.props.navigateTo(to)}
        class={className}
      />)
    return (
      <div className="Header">
        <div className="header">
          {buildIcon('Roam', 'landing', 'header--icon')}
          <div className="header--background">
            <div className="header--nav" >
              <div style={{ width: '50px', height: '50px' }} />
              {buildIcon('Map', 'plan', 'header--icon-nav')}
              {buildIcon('Flight', 'book', 'header--icon-nav')}
            </div>
            <div />
            <div className="header--nav">
              {buildIcon('Account', 'profile', 'header--icon-nav')}     
              {this.props.auth.sid === null
                ? buildIcon('Login', 'login', 'header--icon-nav')
                : buildIcon('Logout', 'logout', 'header--icon-nav') 
              }
            </div>  
          </div>
        </div>
      </div>)
    }
  };

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => bindActionCreators({ navigateTo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
