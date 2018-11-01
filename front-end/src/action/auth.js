import superagent from 'superagent';
import * as routes from '../routes';
// import cookie from 'react-cookie';


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
    .withCredentials() //! Vinicio - get cookies
    .then((response) => { //! 3
      //! Vinicio - set is a SYNC action, therefore; it connects and updates the store
      return store.dispatch(set(response.token)); // !4
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_BACKEND}`) // eslint-disable-line
    .auth(user.username, user.password)
    .withCredentials() //! Vinicio - get cookies
    .then((response) => { //! 3
      //! Vinicio - set is a SYNC action, therefore; it connects and updates the store
      return store.dispatch(set(response.token)); // !4
    });
};
