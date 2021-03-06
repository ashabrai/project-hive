import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlarmControls from '../alarm-controls/alarm-controls';
// import Status from '../status/status';

import AuthForm from '../auth-form/auth-form';
import * as routes from '../../routes';
import * as authActions from '../../action/auth';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.render ={};
    this.state.render.alarmControls = false;
  }

  handleLogin = (user) => {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  };

  handleSignup = (user) => {
    return this.props.pDoSignUp(user)
      .then((response) => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  };

  render() {

    const rootJSX = <div>
      <h2> Welcome to Save the Hive </h2>
      <Link to='signup'>Create an Account </Link>
      <Link to='/login'>Login Here</Link>
    </div>;

    const signUpJSX = <div>
      <h2> Create a Account </h2>
      <AuthForm type='signup' onComplete={this.handleSignup}/>
      <p> Already a member? </p>
      <Link to='/login'> Login Here </Link>
    </div>;

    const loginJSX = <div>
      <h2> Login to Hive </h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p> Do not have an account? </p>
      <Link to='/signup'>Account Creation</Link>
    </div>;

      const armJSX = <div>
        <h2> ENTER ACCESS CODE </h2>
        <AuthForm type ='arm' onComplete={this.handleSubmit}/>
        <AlarmControls type ='arm' onComplete={this.handleSubmit}/>

      </div>

    const { location } = this.props;

    return (
      <nav>
        { location.pathname === routes.ROOT ? rootJSX : undefined }
        { location.pathname === routes.SIGNUP_FRONTEND ? signUpJSX : undefined }
        { location.pathname === routes.LOGIN ? loginJSX : undefined }
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  pDoSignUp: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
  pDoAccesscode: user => dispatch(authActions.accesscodeRequest(user)),
});

Landing.propTypes = {
  location: PropTypes.object,
  pDoSignUp: PropTypes.func,
  pDoLogin: PropTypes.func,
  pDoAccesscode: PropTypes.func,
};

export default connect(mapStateToProps,mapDispatchToProps)(Landing);
