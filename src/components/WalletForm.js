import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editedExpense, requestApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    id: 0,
    currency: 'USD',
    tag: 'Alimentacao',
    method: 'Cartão de débito',
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestApi());
  }

  handleState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    // this.setState({ value: '', description: '' });
    dispatch(requestApi(this.state));
    this.setState({ id: id + 1, value: '', description: '' });
    // this.setState({ id: id + 1 });
  };

  handleEditor = () => {
    const { expenses, id, dispatch } = this.props;
    console.log(expenses, id);
    const findExpense = expenses.find((element) => element.id === id);
    const filterElement = expenses.filter((element) => element.id !== id);
    const { exchangeRates } = findExpense;
    const { value, currency, method, description, tag } = this.state;
    const editElement = { id, value, currency, method, description, tag, exchangeRates };
    const newElement = [...filterElement, editElement].sort((a, b) => a.id - b.id);
    dispatch(editedExpense(newElement));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      tag: 'Alimentacao',
      method: 'Cartão de débito' });
  };

  render() {
    const { value, currency, tag, method, description } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form>
        Value
        <input
          name="value"
          data-testid="value-input"
          type="number"
          value={ value }
          onChange={ this.handleState }
        />
        Descrição
        <input
          name="description"
          data-testid="description-input"
          type="text-box"
          value={ description }
          onChange={ this.handleState }
        />
        Moeda
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleState }
        >
          {currencies.map((e) => (
            <option value={ e } key={ e }>
              {e}
            </option>
          ))}
        </select>
        Método de pagamento
        <select
          name="method"
          data-testid="method-input"
          type="tag"
          value={ method }
          onChange={ this.handleState }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        Categoria
        <select
          name="tag"
          data-testid="tag-input"
          type="tag"
          defaultValue={ tag }
          onChange={ this.handleState }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <div>
          {
            editor ? (
              <button type="button" onClick={ this.handleEditor }>
                Editar despesas
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
          }
        </div>
      </form>
    );
  }
}
WalletForm.propTypes = {
  isLoading: PropTypes.string,
  currencies: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  id: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps, null)(WalletForm);

// export default WalletForm;
