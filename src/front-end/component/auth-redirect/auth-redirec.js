import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from '../../routes';

class AuthRedirect extends React.Component {
  render(){
    const { location, token } = this.props;
    const { pathname } = location;
    let destinationRoute = null;
    if(pathname === routes.LOGIN || pathname === routes.SIGNUP_FRONTEND || pathname === routes.)
  }
}
