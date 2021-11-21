import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
import { emailFromLocStoAC as getEmailFromLS} from '../actions';
import logo from '../images/logo-trybeWallet.png';
import '../styles/header.css';

class Header extends React.Component {

  componentDidMount () { // Captando o e-mail do usuário, salvo no local storage, e jogando-o para Store. Dessa forma, sempre que a página '/carteira' for atualizada, o e-mail do usuário não será perdido.
    const { emailFromLocStoProp } = this.props;
    const savedUserMailFromLS = JSON.parse(localStorage.getItem("userMail"));

    if(savedUserMailFromLS && savedUserMailFromLS !== null) {
      emailFromLocStoProp(savedUserMailFromLS);
    }
  }

  render() {
    const { userMailProp, totalExpenseBRLProp } = this.props;

    return (
      <header id="websiteHeader">
        <img src={ logo } alt='Logo Trybe Wallet' />
        <div id="userMailAndTotalExpensesContainer">
          <span data-testid="email-field">{ `E-mail: ${userMailProp}` }</span>
          <span>
            Despesa Total: R$
            <output data-testid="total-field">
              { ` ${Number(totalExpenseBRLProp).toFixed(2)}` }
            </output>
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userMailProp: PropTypes.string.isRequired,
  totalExpenseBRLProp: PropTypes.number.isRequired,
  emailFromLocStoProp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userMailProp: state.user.email,
  totalExpenseBRLProp: state.wallet.totalExpValueBRL,
});

const mapDispatchToProps = (dispatch) => ({
  emailFromLocStoProp: (savedUserMail) => dispatch(getEmailFromLS(savedUserMail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header); // Não houve necessidade do mapDispatchToProps, por isso utilizei null.
