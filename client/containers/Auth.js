import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../actions/index';

import { Link } from 'react-router-dom';
import { authProcessor } from '../assistants';
import { CreateAccount, GetStarted, Init, LogIn, LogOut, Password} from '../components/Auth'

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      stage: this.props.logout
        ? <LogOut saveUser={this.props.updateUser} />
        : <Init changeStage={this.changeStage.bind(this)} />
    }
    this.stages = {
      'Get Started': <GetStarted changeStage={this.changeStage.bind(this)} />,
      'Create Account': <CreateAccount changeStage={this.changeStage.bind(this)} authProcessor={authProcessor} />,
      'Password': <Password email={authProcessor.getEmail} changeStage={this.changeStage.bind(this)} authProcessor={authProcessor} saveUser={this.saveUser.bind(this)}/>,
      'Create Password': <Password confirm={true} changeStage={this.changeStage.bind(this)} authProcessor={authProcessor} saveUser={this.saveUser.bind(this)}/>,
      'Log In': <LogIn changeStage={this.changeStage.bind(this)} authProcessor={authProcessor} />
    }
  }
  saveUser(payload) {
    this.props.updateUser(payload);
  }
  changeStage(to) {
    this.setState({stage:this.stages[to]})
  }
  render() {
    return (
      <div className="Auth">
        {this.state.stage}
      </div>
    )
  }
};

const mapStateToProps = (state) => ({ auth: state.auth });

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
