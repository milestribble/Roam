import React, { Component } from 'react';

const Init = (props) => {
  const changeStage = (destination) => props.changeStage(destination);
  
  return (
    <div className="Init">
      <div className="page--center">
        <button onClick={() => changeStage('Get Started')}>Get Started</button>
        <button onClick={() => changeStage('Log In')}>Log In</button>
      </div>
    </div>
  );
}


export default Init
