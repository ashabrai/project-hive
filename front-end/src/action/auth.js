import superagent from 'superagent';
import * as routes from '../routes';


// ---------------Sync-------------------//

export const set = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const remove = () => ({
  type: 'TOKEN_REMOVE',
});

// --------------Async------------------//


export const signupRequest = user => (store) => {
  //! 2
  return superagent.post(`${API_URL}${routes.SIGNUP_BACKEND}`) // eslint-disable-line
    .send(user)
    // .withCredentials()
    .then((response) => { //! 3
      return store.dispatch(set(response.text)); // !4
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_BACKEND}`) // eslint-disable-line
    .auth(user.username, user.password)
    // .withCredentials() //! Vinicio - get cookies
    .then((response) => { //! 3
      return store.dispatch(set(response.text)); // !4
    });
};
