import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApi } from '../redux/actions';

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

  render() {
    const { value, currency, tag, method, description } = this.state;
    const { currencies } = this.props;
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
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
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
});

export default connect(mapStateToProps, null)(WalletForm);

// export default WalletForm;
