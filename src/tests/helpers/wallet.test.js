import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
  it('Componente Login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    // const title = screen.getByRole('heading', { name: /login/i });
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('buttonId-input');
    const emailTest = 'abc@gmail.com';
    const password2 = '123456';

    // expect(title).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe('Entrar');

    userEvent.type(email, emailTest);
    userEvent.type(password, password2);
    expect(email).toHaveValue('abc@gmail.com');
    expect(password).toHaveValue('123456');
    expect(button).toBeEnabled();
    userEvent.click(button);

    // const { location: { pathname } } = history;
    const valueInput = await screen.findByTestId('value-input');
    console.log(valueInput);
    screen.logTestingPlaygroundURL();
    // const path = history.location.pathname;
    // expect(path).toBe('/carteira');
  });
  it('Compomente carteira', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    // const { location: { pathname } } = history;
    const currency = await screen.findAllByTestId('currency-input');
    const value = screen.getByTestId('value-input');
    const tag = screen.getByTestId('tag-input');
    const method = screen.getByTestId('method-input');
    const description = screen.getByTestId('description-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const zeroValue = screen.getByText('0.00');

    expect(history.location.pathname).toBe('/carteira');
    expect(value).toBeInTheDocument();
    expect(currency[0]).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    // expect(button).toBeDisabled();
    expect(zeroValue).toBeInTheDocument();
    expect(zeroValue).toHaveTextContent('0.00');
  });
});
