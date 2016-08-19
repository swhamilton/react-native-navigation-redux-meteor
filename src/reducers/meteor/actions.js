import * as types from './actionTypes';

export function updateMeteorData(user, status, loggedIn) {
  return {
    type: types.UPDATE_METEOR_DATA,
    user: user,
    status: status,
    loggedIn: loggedIn,
  };
}
