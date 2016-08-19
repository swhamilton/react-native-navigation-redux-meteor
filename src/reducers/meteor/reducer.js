import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  user: null,
  loggingIn: false,
  status: {},
});

export default function meteorData(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_METEOR_DATA:
    console.log('UPDATE_METEOR_DATA');
    return state.merge({
      user: action.user,
      loggingIn: action.loggingIn,
      status: action.status,
    });
    default:
    return state;
  }
}
