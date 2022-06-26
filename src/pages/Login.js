import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionEmail } from '../actions';
import style from './Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validation);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { sendMailToState } = this.props;
    sendMailToState(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  validation() {
    const { email, password } = this.state;
    const SEIS = 6;
    const passwordValidation = password.length >= SEIS;
    const emailValidation = email.includes('@') && email.includes('.com');
    const teste = emailValidation && passwordValidation;
    this.setState({
      disableButton: !teste,
    });
  }

  render() {
    const { email, password, disableButton } = this.state;
    return (
      <div className={ style.container }>
        <form className={ style.wrapper }>
          <h2>Trybe Wallet Login</h2>
          <label htmlFor="emailInput">
            Email:
            <input
              data-testid="email-input"
              id="emailInput"
              type="text"
              name="email"
              value={ email }
              placeholder="seuemail@aqui.com"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="passwordInput">
            Senha:
            <input
              data-testid="password-input"
              id="passwordInput"
              type="password"
              name="password"
              value={ password }
              placeholder="******"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="button-login"
            type="button"
            onClick={ this.handleSubmit }
            disabled={ disableButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendMailToState: (email) => dispatch(actionEmail(email)),
});

Login.propTypes = {
  history: propTypes.objectOf(propTypes.func),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
