import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDespesas: 0,
    };
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

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
