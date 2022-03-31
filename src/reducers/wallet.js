// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, RECEIVE_API_SUCCESS, RECEIVE_API_FAILURE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case RECEIVE_API_SUCCESS:
    return {
      ...state,
      currencies: action.data,
    };
  case RECEIVE_API_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
}

export default wallet;
