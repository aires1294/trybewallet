import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  tax = (ask) => {
    const tax = Number(ask);
    const cambio = Number(tax).toFixed(2);
    return cambio;
  };

  val = (value, ask) => {
    const moedaReal = Number(value) * Number(ask);
    const real = Number(moedaReal).toFixed(2);
    return real;
  };

  handleClick = (id) => {
    const { dispatch, expenses } = this.props;
    // console.log(expenses, 'linha 21');
    const expenseDelete = expenses.filter((element) => element.id !== id);
    dispatch(deleteExpense(expenseDelete));
  };

  fieldEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado,</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{Number(element.value).toFixed(2)}</td>
              <td>{element.exchangeRates[element.currency].name}</td>
              <td>{this.tax(element.exchangeRates[element.currency].ask)}</td>
              <td>
                {this.val(
                  element.value,
                  element.exchangeRates[element.currency].ask,
                )}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.fieldEdit(element.id) }
                >
                  Editar despesa
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.handleClick(element.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
// export default Table;
