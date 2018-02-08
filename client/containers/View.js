import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/index';
import { Book, Plan, Landing, Profile, Auth } from '../containers';
import { NotFound, Intro } from '../components';

const proxy = {
  get: (target, name) => target.hasOwnProperty(name) ? target[name] : <NotFound />,
}
const views = {
  login: <Auth />,
  logout: <Auth logout={true} />,
  profile: <Profile />,
  landing: <Landing />,
  plan: <Plan />,
  book: <Book />,
  intro: <Intro />
} 

const viewsProxy = new Proxy(views, proxy)

const initPath = window.location.pathname.split('/')[1];
navigateTo(initPath)

const View = props => {
  console.log('from view.render:', props.nav);
  return (
    <div className="View">
      {props.nav && viewsProxy[props.nav]}
    </div>
  )};

const mapStateToProps = (state) => ({ nav: state.nav });

const mapDispatchToProps = (dispatch) => bindActionCreators({ navigateTo }, dispatch);

export default connect(mapStateToProps)(View);
