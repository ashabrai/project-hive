import superagent from 'superagent';
import * as routes from '../routes';

const set = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const createRequest = (profile) => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.PROFILE_BACKEND}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(set(response.body));
    })
    .catch(console.error);
};

const getRequest = () => (store) =>{
  const { token } = store.getState();

  return superagent.get(`${API_URL}${routes.PROFILE_BACKEND}/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) =>{
      return store.dispatch(set(response.body));
    })
    .catch(console.error);
};
