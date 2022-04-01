import React from 'react';

class Table extends React.Component {
  render() {
    const products = [
      {
        id: 0,
        name: 'Tomas',
        price: 123.11,
        stock: 'true',
      },
      {
        id: 1,
        name: 'Rosana',
        price: 3123.11,
        stock: 'false',
      }];
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
            {products.map((product) => (
              <tr key={ product.id }>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
