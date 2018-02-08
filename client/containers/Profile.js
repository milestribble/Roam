import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo, updateUser } from '../actions/index';

const Profile = props => (
  <div className="Profile">
    <div className="profile page">
      <div className="page--center">
        Profile
        {JSON.stringify(props.auth)}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => bindActionCreators({ navigateTo, updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
