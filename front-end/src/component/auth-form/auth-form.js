import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';


const emptyState = {
  username: '',
  usernamePristine: true,
  usernameError: 'Username is Required',
  usernameTaken: '',

  email: '',
  emailPristine: true,
  emailError: 'Email is Required',

  password: '',
  passwordPristine: true,
  passwordError: 'Password is required',

  accesscode:'',
  accesscodePristine: true,
  accesscodeError: 'Accesscode is required',
};

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 4;
const MIN_ACCESSCODE_LENGTH = 4;


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleValidation = (name, value) => {

    switch(name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return `Your username must at least ${MIN_NAME_LENGTH} characters long`;
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email';
        }
        return null;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
        }
        return null;
      case 'accesscode':
        if (value.length < MIN_ACCESSCODE_LENGTH) {
          return `Your accesscode must be at least ${MIN_ACCESSCODE_LENGTH} numbers long`;
        }
        return null;
      default:
        return null;
    }
  };

  handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    this.setState({[name]: value,
    [name]: value,
      [`${name}Pristine`]: false,
      [`${name}Error`]: this.handleValidation(name,value),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { usernameError, emailError, passwordError, accesscodeError } = this.state;

    if(this.props.type === 'login' || (!usernameError && !passwordError && !emailError && !accesscodeError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    }
      else{
        this.setState({
          usernamePristine: false,
          passwordPristine: false,
          emailPristine: false,
          accesscodePristine: false,
        });
    }
  };

  render() {
    let { type } = this.props;
    type = type === 'login' ? 'login' : 'signup';

    const signupJSX =
      <div>
        { this.state.emailPristine ? undefined : <p>{ this.state.emailError }</p> }
      <input className="signUp"
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />
      </div>;

    return(
      <div className="formLayout">
      <form onSubmit={this.handleSubmit}>
        { this.state.usernamePristine ? undefined : <p>{this.state.usernameError}</p>}
        <input className="signUp"
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />
        { type !== 'login' ? signupJSX : undefined }
        { this.state.passwordPristine ? undefined : <p> {this.state.passwordError}</p>}
        <input className="signUp"
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        { this.state.accesscodePristine ? undefined: <p>{this.state.accesscodeError}</p>}
        <input className="signUp"
               name='accesscode'
               placeholder='accesscode'
               type='accesscode'

               value={this.state.accesscode}
               onChange={this.handleChange}
               />
        <button type='submit'>{type}</button>
      </form>
        </div>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
};

export default AuthForm;
