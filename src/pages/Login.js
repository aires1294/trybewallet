import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    isBtnDisabled: true,
    email: '',
    password: '',
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({[name]: value}, () => this.verifyBtn)
  }

  verifyBtn = () => {
    const { email, password } = this.state
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email)
    const verifyPassword = password.length > 6
    const btnState = verifyEmail && verifyPassword
    this.setState({ isBtnDisabled: !(btnState) })
  }

  render() {
    return (
      <div>
        <input data-testid="email-input" type="text" />
        Email
        <input data-testid="password-input" type="text" />
        Senha
        <button type="button" data-testid="button-input" onClick={} name={}>
          Entrar
        </button>
      </div>
    );
  }
}

export default connect() (Login);
