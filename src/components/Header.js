import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, cur) => {
      // Somal total das despesas
      // Qual moeda gastou
      const coin = cur.currency;
      // Achar o ASk
      const { ask } = cur.exchangeRates[coin];
      // Quanto ela gastou
      const { value } = cur;
      // Multiplicar quanto gastou pelo ask = multi
      const multi = value * ask;
      // Retornar pro acc o valor de multi
      const soma = acc + multi;
      return soma;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        HEADER
        <p data-testid="email-field">{email}</p>
        <p>
          {'Despesa total: '}
          <span>
            R$
            <span data-testid="total-field">{this.sumTotal()}</span>
          </span>
        </p>
        {/* <p data-testid="total-field">{ this.sumTotal() }</p> */}
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
