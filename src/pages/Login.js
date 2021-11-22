import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
import { setLoginInfoAC as getUserMailAC } from '../actions'; // Importação da Action Creator, para que seja possível realizar o dispatchToProps. || Importei com o nome alterado (Alias) pois estava dando erro.
import logo from '../images/logo-trybeWallet.png';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userMail: '',
      userPassword: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.mailValidator = this.mailValidator.bind(this);
    this.signIn = this.signIn.bind(this);
    this.registerWithEnter = this.registerWithEnter.bind(this);
  }

  componentWillUnmount() {
    // Salvando o e-mail do usuário que acabou de logar, no local Storage.
    const { userMail } = this.state;
    localStorage.setItem('userMail', JSON.stringify(userMail));

    // Caso o usuário esteja logando pela primeira vez, a key 'emailUsuário-expensesArray' será definida como '[]' e a key 'emailUsuário-totalExpValueBRL' será definida como '0', no local storage.
    const expArrayFromLS = JSON.parse(localStorage.getItem(`${userMail}-expensesArray`));

    if (!expArrayFromLS) {
      localStorage.setItem(`${userMail}-expensesArray`, JSON.stringify([]));
      localStorage.setItem(`${userMail}-totalExpValueBRL`, JSON.stringify(0));
    }
  }

  onInputChange({ target }) { // Função que altera o valor do estado local, sempre que um input for realizado no elemento onde ela está sendo chamada. || OBS: Para que tal função funcione, os 'name' de cada um dos elementos do Forms devem ser iguais ao nome dos estados.
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  mailValidator(email) { // REF: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validateMailRegex = /\S+@\S+\.\S+/;
    // Explicação Regex: String (Usuário) + @ + String (Provedor) + . + String (.com ou .com.br ou .qualquerCoisa). --> Resultado: texto@texto.qualquerCoisa.

    return validateMailRegex.test(email); // Retorna 'True' se o e-mail estiver dentro dos padrões definidos na validateMailRegex. Retorna 'False', caso não esteja;
  }

  signIn() {
    const minNumOfCaracs = 6;
    const { userMail, userPassword } = this.state;
    const { dispatchEmailProp, history } = this.props;

    const isMailValid = this.mailValidator(userMail); // Atribui 'True' se o e-mail estiver dentro dos padrões definidos na mailValidator(). Atribui 'False', caso não esteja;
    const isPasswordValid = (userPassword.length >= minNumOfCaracs); // Atribui 'True' se a senha possuir 6 caracteres ou mais. Atribui 'False', caso não possua;

    if (isMailValid && isPasswordValid) {
      dispatchEmailProp(userMail); // O e-mail do usuário será enviado para o estado global da aplicação (Store).
      history.push('/carteira'); // Redirecionamento para o path "/carteira" após inserir e-mail e senha válidos.
    }
  }

  registerWithEnter(e) { // Permite fazer o login pressionando a tecla Enter. --> Feature extra!
    e.preventDefault();
    this.signIn();
  }

  render() {
    const { userMail, userPassword } = this.state;
    const minNumOfCaracs = 6;

    return (
      <main id="loginPageMain">
        <div id="loginFormContainer">
          <img src={ logo } alt="Logo Trybe Wallet" />
          <form id="loginForm">
            <label htmlFor="userMailInput">
              <input
                id="userMailInput"
                data-testid="email-input"
                type="email"
                name="userMail"
                value={ userMail }
                onChange={ this.onInputChange }
                placeholder="Digite seu e-mail"
              />
            </label>
            <label htmlFor="userPassword">
              <input
                id="userPassword"
                data-testid="password-input"
                type="password"
                name="userPassword"
                value={ userPassword }
                onChange={ this.onInputChange }
                onKeyPress={ (event) => event.key === 'Enter'
                  && this.registerWithEnter(event) } // Habilita envio da informações com a tecla 'Enter'.
                placeholder="Digite sua senha"
              />
            </label>
            <button
              id="loginBtn"
              type="button"
              disabled={ !(this.mailValidator(userMail)
                && userPassword.length >= minNumOfCaracs) } // O botão só será habilitado quando e-mail e senha estiverem nos padrões corretos.
              onClick={ this.signIn }
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchEmailProp: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchEmailProp: (userMail) => dispatch(getUserMailAC(userMail)),
});

export default connect(null, mapDispatchToProps)(Login); // Não houve necessidade do mapStateToProps, por isso utilizei null.
