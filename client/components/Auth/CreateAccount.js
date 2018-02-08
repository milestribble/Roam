import React, { Component } from 'react';
import $ from 'jquery';

class CreateAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
    }
  }

  componentDidMount(){
    $('.CreateAccount--back-button').click(() => this.props.changeStage('Get Started'))

    $('form').on("submit", ((event) => {
      event.preventDefault();
      const submission = $('form').serializeArray()
      const allFieldsPopulated = submission.reduce((acu, entry) =>
        (!(acu === false || entry.value === ''))
      , true)
      if (allFieldsPopulated){
        this.props.authProcessor.setIntent('create')
        this.props.authProcessor.verifyAndSaveValues(submission)
          .then(() => this.props.changeStage('Create Password'))
          .catch(error => this.setState({error}))
      } else {
        this.setState({error: 'Please fill in each field' })
      }
    }));
  }

  render(){
    return (
      <div className="CreateAccount">
        <div className="page--center">
          {this.state.error}
          <form>
            {["first_name", "last_name", "username", "email"].map(input =>
              (<input
                key={input}
                type={input==="Email" ? "email" : "text"}
                placeholder={input}
                name={input}
              />))}
            <button type="submit">Next</button>
          </form>
            <button className="CreateAccount--back-button">Back</button>
        </div>
      </div>
    );
  }
}
export default CreateAccount
