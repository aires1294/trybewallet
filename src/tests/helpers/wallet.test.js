import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  it('Componente Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const title = screen.getByRole('heading', { name: /login/i });
    const email = screen.getByTestId('email-input');
    const password = screen.getByTextId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    const emailTest = 'abc@gmail.com';
    const password2 = '123456';

    expect(title).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe('Entrar');

    userEvent.type(emailTest, email);
    userEvent.type(password, password2);
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
  it('Compomente carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const { location: { pathname } } = history;
    const value = screen.getByTextId('value-input');
    const currency = screen.getAllByTestId('currency-input');
    const tag = screen.getByTextId('tag-input');
    const method = screen.getByTextId('method-input');
    const description = screen.getByTextId('description-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const zeroValue = screen.getByText('0.00');

    expect(pathname).toBe('/carteira');
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(zeroValue).toBeInTheDocument();
    expect(zeroValue).toHaveTextContent('0.00');
  });
});
