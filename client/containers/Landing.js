import React from 'react';
import { connect } from 'react-redux';

const Landing = props => (
  <div className="Landing">
    <div className="landing page">
      <div className="page--center">
        <input
          placeholder="Where To?"
        />  
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Landing);
