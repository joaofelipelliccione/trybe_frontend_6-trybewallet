// Importando função responsável pela realização do fetch().
import currenciesAPI from '../services/currenciesAPI';

/*
Criação da 1ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a user().
*/
export const SET_LOGIN_INFO = 'SET_LOGIN_INFO';
export const setLoginInfoAC = (email) => ({
  type: SET_LOGIN_INFO,
  email,
});

/*
Criação da 2ª Action Creator. Essa, será chamada dentro de thunk.
- Sua reducer é a wallet().
*/
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
const getCurrenciesAC = (currenciesData) => ({
  type: GET_CURRENCIES_SUCCESS,
  currenciesData,
});

/*
Criação da 3ª Action Creator. Essa, será chamada dentro de thunk.
- Sua reducer é a wallet().
*/
export const GET_CURRENCIES_ERROR = 'GET_CURRENCIES_ERROR';
const errorAC = (errorMsg) => ({ type: GET_CURRENCIES_ERROR, errorMsg });

/*
Criação da 4ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a wallet().
*/
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';
export const addNewExpenseAC = (newExpenseObj, expValueBRL) => ({
  type: ADD_NEW_EXPENSE,
  newExpenseObj,
  expValueBRL,
});

/*
Criação da 5ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a wallet().
*/
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpenseAC = (updatedExpArray, deletedExpValueBRL) => ({
  type: DELETE_EXPENSE,
  updatedExpArray,
  deletedExpValueBRL,
});

/*
Criação da 6ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a user().
*/
export const DATA_FROM_LOC_STO_USER = 'DATA_FROM_LOC_STO_USER';
export const emailFromLocStoAC = (savedUserMail) => ({
  type: DATA_FROM_LOC_STO_USER,
  savedUserMail,
});

/*
Criação da 7ª Action Creator. Essa, não será chamada dentro de thunk.
- Sua reducer é a wallet().
*/
export const DATA_FROM_LOC_STO_WALLET = 'DATA_FROM_LOC_STO_WALLET';
export const dataFromLocStoAC = (savedExpArray, savedTotalExpBRL) => ({
  type: DATA_FROM_LOC_STO_WALLET,
  savedExpArray,
  savedTotalExpBRL,
});

/*
Criação da 1ª e única Action Creator Thunk.
- É uma AC especial, que retornará uma função e não um objeto como de costume.
- A função retornada engloba a currenciesAPI() e as AC 2 e 3, mencionadas acima.
*/
export const fetchCurrencies = () => async (dispatch) => {
  try { // Tentando realizar o fetch();
    const objResponse = await currenciesAPI();
    if (objResponse === undefined) {
      throw new Error(); // Caso o retorno da API não seja o esperado, um erro será lançado.
    }
    dispatch(getCurrenciesAC(objResponse)); // Mesmo se o retorno não for o esperado, o dispatch da getCurrenciesAC() ocorrerá, entretanto, irei saber que o erro ocorreu.
  } catch (e) { // Capturando o erro lançado acima, caso ele exista.
    dispatch(errorAC(e));
  }
};
