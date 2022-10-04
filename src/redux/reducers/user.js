import { GET_LOGIN } from '../actions';

const INICIAL_STATE = {
  email: '',
};

const user = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN: {
    return {
      email: action.payload,
    };
  }
  default:
    return state;
  }
};

export default user;
