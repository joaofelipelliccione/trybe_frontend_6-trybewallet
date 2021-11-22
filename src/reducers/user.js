// Esse reducer será responsável por tratar as informações da pessoa usuária.
import { SET_LOGIN_INFO, DATA_FROM_LOC_STO_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) { // Reducer responsável por armazenar o e-mail do usuário logado. Sua Action Creator é a setLoginInfoAC().
  switch (action.type) {
  case SET_LOGIN_INFO:
    return {
      ...state,
      email: action.email,
    };

  case DATA_FROM_LOC_STO_USER:
    return {
      ...state,
      email: action.savedUserMail,
    };

  default:
    return state;
  }
}

export default user;
