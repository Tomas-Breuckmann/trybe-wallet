/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchAPI, actionListExpensives } from '../actions';
import Table from '../components/Table';
import style from './Wallet.module.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDespesas: 0,
      valueExpenses: '',
      descriptionExpenses: '',
      moedaExpenses: 'USD',
      pagamentoExpenses: 'Dinheiro',
      categoriaExpenses: 'Alimentação',
      listaExpenses: [],
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { valueExpenses, descriptionExpenses, moedaExpenses,
      pagamentoExpenses, categoriaExpenses, listaExpenses } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const newExpense = {
      id: listaExpenses.length,
      value: valueExpenses,
      currency: moedaExpenses,
      method: pagamentoExpenses,
      tag: categoriaExpenses,
      description: descriptionExpenses,
      exchangeRates: data,
    };
    this.setState({
      listaExpenses: [...listaExpenses, newExpense],
    }, this.enviaList);
  }

  enviaList = async () => {
    const { listaExpenses } = this.state;
    const { sendExpensesListToState } = this.props;
    sendExpensesListToState(listaExpenses);
    this.setState({
      valueExpenses: 0,
    });
    // console.log(listaExpenses);
    const valores = listaExpenses.map((despesa) => {
      // console.log(Object.entries(despesa.exchangeRates));
      const retorno = Object.entries(despesa.exchangeRates)
        .filter((item) => item[0] === despesa.currency);
      // console.log('retorno filter', retorno[0][1].ask);
      // return Number(despesa.value);
      return Number(retorno[0][1].ask) * Number(despesa.value);
    });
    // console.log('retorno do map', valores);
    const somaExpenses = valores.reduce((soma, numero) => soma + numero).toFixed(2);
    // console.log(somaExpenses);
    this.setState({
      totalDespesas: somaExpenses,
    });
  }

  render() {
    const { userEmail, currencies } = this.props;
    const { totalDespesas, valueExpenses, descriptionExpenses } = this.state;
    return (
      <div>
        <header className={ style.header }>
          <p data-testid="email-field">
            Logado como: { userEmail }
          </p>
          <p data-testid="total-field">
            Total das despesas: { totalDespesas }
          </p>
          <p data-testid="header-currency-field">
            Moeda utilizada: BRL
          </p>
        </header>
        <main className={ style.wallet }>
          <label htmlFor="valueInput">
            Valor:
            <input
              data-testid="value-input"
              id="valueInput"
              type="text"
              name="valueExpenses"
              value={ valueExpenses }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              data-testid="description-input"
              id="descriptionInput"
              type="text"
              name="descriptionExpenses"
              value={ descriptionExpenses }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moedaExpenses">
            Moeda:
            <select
              name="moedaExpenses"
              id="moedaExpenses"
              onChange={ this.handleChange }
            >
              {
                currencies.map((sigla, index) => (
                  <option key={ index } value={ sigla }>
                    { sigla }
                  </option>
                ))
              }
            </select>
          </label>
          <label htmlFor="pagamentoExpenses">
            Pagamento:
            <select
              name="pagamentoExpenses"
              id="pagamentoExpenses"
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option key="Dinheiro" value="Dinheiro">Dinheiro</option>
              <option key="Credito" value="Cartão de crédito">Cartão de crédito</option>
              <option key="Debito" value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoriaExpenses">
            Categoria:
            <select
              name="categoriaExpenses"
              id="categoriaExpenses"
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option key="Alimentacao" value="Alimentacao">Alimentação</option>
              <option key="Lazer" value="Lazer">Lazer</option>
              <option key="Trabalho" value="Trabalho">Trabalho</option>
              <option key="Transporte" value="Transporte">Transporte</option>
              <option key="Saude" value="Saude">Saúde</option>
            </select>
          </label>
          <button
            name="botao"
            type="button"
            onClick={ this.handleSubmit }
            // disabled={ disableButton }
          >
            Adicionar despesa
          </button>
        </main>
        <div>
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchAPI()),
  sendExpensesListToState: (list) => dispatch(actionListExpensives(list)),
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
