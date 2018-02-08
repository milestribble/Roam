import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo, updateUser } from '../actions/index';

const Book = props => (
  <div className="Book">
    <div className="book page">
      <div className="page--center">
        Book
        {JSON.stringify(props.auth)}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => bindActionCreators({ navigateTo, updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Book);
