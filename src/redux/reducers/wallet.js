import { INICIAL_REQ, GET_API, ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INICIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada,
  loading: false,
};

function wallet(state = INICIAL_STATE, action) {
  switch (action.type) {
  case INICIAL_REQ:
    return {
      ...state,
      loading: true,
    };
  case GET_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  // case EDIT_TABLE:
  //   return {
  //     ...state,
  //     editor: true,
  //     idToEdit: action.payload,
  //   };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default wallet;
