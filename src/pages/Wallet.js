import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchAPI } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDespesas: 0,
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
    // const moedas = resposta.map((cur) => cur !== 'USDT');
    // const resposta1 = Array.of(resposta);
    // console.log(resposta);
  }

  render() {
    const { userEmail } = this.props;
    const { totalDespesas } = this.state;
    return (
      <div>
        <p data-testid="email-field">
          { userEmail }
        </p>
        <p data-testid="total-field">
          { totalDespesas }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchAPI()),
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
