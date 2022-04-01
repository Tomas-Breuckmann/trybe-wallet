import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchAPI } from '../actions';

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

  render() {
    const { userEmail, currencies } = this.props;
    const { totalDespesas, valueExpenses, descriptionExpenses, moedaExpenses,
      pagamentoExpenses, categoriaExpenses } = this.state;
    console.log(moedaExpenses, pagamentoExpenses, categoriaExpenses);
    return (
      <div>
        <header>
          <p data-testid="email-field">
            { userEmail }
          </p>
          <p data-testid="total-field">
            { totalDespesas }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <main>
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
        </main>
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
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
