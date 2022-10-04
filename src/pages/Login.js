import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogin } from '../redux/actions';

class Login extends Component {
  state = {
    isDisabled: true,
    email: '',
    password: '',
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const maiorSeis = 6;
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= maiorSeis;
    // const btnState = verifyEmail && verifyPassword;
    this.setState({ isDisabled: !(verifyEmail && verifyPassword) });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getLogin(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          // value="email"
          onChange={ this.handleInput }
        />
        Email
        <input
          data-testid="password-input"
          type="password"
          name="password"
          // value="password"
          onChange={ this.handleInput }
        />
        Senha
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleBtn }
        >
          Entrar
        </button>
      </form>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
// export default Login;
