import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { listaExpenses } = this.props;
    // console.log('lista geral principal', listaExpenses);
    const expenses = listaExpenses.map((despesa) => {
      const retornos = Object.keys(despesa.exchangeRates)
        .filter((siglaMoeda) => siglaMoeda !== 'USDT')
        .map((siglaMoeda) => despesa.exchangeRates[siglaMoeda])
        .filter((item) => item.code === despesa.currency);
      //   console.log('retornos da moeda em questao', retornos);
      const nomeMoeda = retornos[0].name.split('/')[0];
      const valorAsk = Number(retornos[0].ask).toFixed(2);
      const valorCompra = Number(despesa.value).toFixed(2);
      const valorTotal = (Number(retornos[0].ask) * Number(despesa.value)).toFixed(2);
      const item = {
        description: despesa.description,
        tag: despesa.tag,
        method: despesa.method,
        value: valorCompra,
        currency: nomeMoeda,
        ask: valorAsk,
        totalValue: valorTotal,
        real: 'Real',
      };
      return item;
    });
    // console.log('o arrai a mostar na tabela', expenses);
    // preciso de um array da forma [description, tag, method, value, currency name,
    // ask, valor em real, 'Real']
    return (
      <div>
        <h1>Table</h1>
        <table>
          <caption>Our products</caption>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={ index }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.currency}</td>
                <td>{expense.ask}</td>
                <td>{expense.totalValue}</td>
                <td>{expense.real}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  listaEexpenses: propTypes.arrayOf(propTypes.obj),
}.isRequired;

const mapStateToProps = (state) => ({
  listaExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
// export default Table;
