import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Header extends Component {
  render() {
    const { email } = this.props;
    const sum = 0;
    return (
      <div>
        HEADER
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {sum}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;
