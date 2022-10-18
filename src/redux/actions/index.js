export const GET_LOGIN = 'GET_LOGIN'; // getEmail
export const INICIAL_REQ = 'INICIAL_REQ';
export const GET_API = 'GET_API';
export const FAILED_API = 'FAILED_API';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITED_EXPENSE = 'EDITED_EXPENSE';

export const getLogin = (payload) => ({ type: GET_LOGIN, payload });
export const inicialRequest = () => ({ type: INICIAL_REQ });
// requisicao com sucesso
export const responseApi = (payload) => ({ type: GET_API, payload });
// falha na requisicao
export const failedApi = (payload) => ({ type: FAILED_API, payload });
export const addExpense = (payload) => ({ type: ADD_EXPENSE, payload });
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });
export const editedExpense = (payload) => ({ type: EDITED_EXPENSE, payload });

export function requestApi(parametro) {
  return async (dispatch) => {
    dispatch(inicialRequest());
    try {
      fetch('https://economia.awesomeapi.com.br/json/all')
        .then((response) => response.json())
        .then((json) => {
          const keys = Object.keys(json).filter(
            (element) => element !== 'USDT',
          );
          if (parametro) {
            dispatch(addExpense({ ...parametro, exchangeRates: json }));
          } else {
            dispatch(responseApi(keys));
          }
        });
    } catch (error) {
      dispatch(failedApi(error.message));
    }
  };
}
