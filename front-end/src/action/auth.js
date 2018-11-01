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
  return superagent.post(`${API_URL}${routes.SIGNUP_BACKEND}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(set(response.text));
    });
};
