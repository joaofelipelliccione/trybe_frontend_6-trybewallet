// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas.
import {
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR,
  ADD_NEW_EXPENSE,
  DELETE_EXPENSE,
  DATA_FROM_LOC_STO_WALLET,
} from '../actions/index';

const INITIAL_STATE = {
  currenciesData: {},
  currencies: [],
  expenses: [],
  totalExpValueBRL: 0,
  errorMsg: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      currenciesData: action.currenciesData, // Alocação do objeto completo, oriundo da API.
      currencies: Object.keys(action.currenciesData)
        .filter((currency) => currency !== 'USDT'), // Alocação do array ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', ...], sem 'USDT'.
    };

  case GET_CURRENCIES_ERROR:
    return {
      ...state,
      errorMsg: action.errorMsg,
    };

  case ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.newExpenseObj],
      totalExpValueBRL: Number((Number(state.totalExpValueBRL)
        + Number(action.expValueBRL)).toFixed(4)),
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.updatedExpArray,
      totalExpValueBRL: Number((Number(state.totalExpValueBRL)
        - Number(action.deletedExpValueBRL)).toFixed(4)),
    };

  case DATA_FROM_LOC_STO_WALLET:
    return {
      ...state,
      expenses: action.savedExpArray,
      totalExpValueBRL: Number(Number(action.savedTotalExpBRL)
        .toFixed(4)),
    };

  default:
    return state;
  }
}

export default wallet;
