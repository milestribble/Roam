import React, { Component } from 'react';

const GetStarted = (props) => {
  const changeStage = (destination) => props.changeStage(destination);
  
  return (
    <div className="GetStarted">
      <div className="page--center">
        <button onClick={() => changeStage('Create Account')}>Create An Account</button>
        OAuth options
        <button onClick={() => changeStage('Log In')}>Log In</button>
      </div>
    </div>
  );
}


export default GetStarted
