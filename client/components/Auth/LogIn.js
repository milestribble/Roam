import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
    }
  }

  componentDidMount(){
    $('.Login--back-button').click(() => this.props.changeStage('Get Started'))

    $('form').on("submit", ((event) => {
      event.preventDefault();
      const submission = $('form').serializeArray()
      if (submission[0].value){
        this.props.authProcessor.setIntent('login')
        this.props.authProcessor.verifyAndSaveValues(submission)
          .then(() => this.props.changeStage('Password'))
          .catch(error => this.setState({error}))
      } else {
        this.setState({error: 'Please fill in your email.' })
      }
    }));
  }

  render(){
    return (
      <div className="Login">
        <div className="page--center">
          {this.state.error}
          <form>
            <input
                type="email"
                placeholder="Email"
                name="email"
              />
            <button type="submit">Next</button>
          </form>
                  OAuth options

            <button className="Login--back-button">Back</button>
        </div>
      </div>
    );
  }
}
export default Login
