import React, { Component } from 'react';
import $ from 'jquery';

class Password extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
    }
  }

  componentDidMount(){
    $('.Password--back-button').click(() => {
      this.props.confirm
        ? this.props.changeStage('Create Account')
        : this.props.changeStage('Log In')
    })

    $('form').on("submit", ((event) => {
      event.preventDefault();
      const password = $('form').serializeArray();
      const passwordsAreEqual = (() => {
        try {return password[0].value === password[1].value}
        catch (e) {return}
      })();
      if ((this.props.confirm && passwordsAreEqual) || !this.props.confirm) {
        this.props.authProcessor.submit(password[0].value)
          .then(res => this.props.saveUser(res))
          .catch(error => this.setState({ error }))
      } else if (this.props.confirm) {
        this.setState({ error: 'Passwords do not match, please try again.' })
      }
    }));
  }

  render(){
    const fields = ['Password'];
    let email = null;
    if (this.props.confirm) fields.push('Confirm Password')
    else if (this.props.email) {
      email = this.props.email(); 
    } 
    
    return (
      <div className="Password">
        <div className="page--center">
          {this.state.error}
          <form>
            {email && <input 
              disabled
              value={email}
            />}
            {fields.map(input => (<input
                key={input}
                type="password"
                placeholder={input}
                name={input}
              />))}
            <button type="submit">Next</button>
          </form>
          <button className="Password--back-button">Back</button>
        </div>
      </div>
    );
  }
}
export default Password
