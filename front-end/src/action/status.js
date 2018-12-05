import superagent from 'superagent';
import * as routes from '../routes';

export const set = status => ({
  type: 'STATUS_SET',
  payload: status,
});

export const armSystem = accesscode => (store) =>{
  return superagent.get(`${API_URL}${routes.ARM_ROUTE}/${accesscode.accessCode}`)
    .then((response) => {
      return store.dispatch(set(response.text));
    });
};

export const disarmSystem = accesscode => (store) =>{
  return superagent.get(`${API_URL}${routes.DISARM_ROUTE}/${accesscode.accessCode}`)
    .then((response) => {
      return store.dispatch(set(response.text));
    });
};
