import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
import logo from '../images/logo-trybeWallet.png';
import '../styles/header.css';

class Header extends React.Component {
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
};

const mapStateToProps = (state) => ({
  userMailProp: state.user.email,
  totalExpenseBRLProp: state.wallet.totalExpValueBRL,
});

export default connect(mapStateToProps, null)(Header); // Não houve necessidade do mapDispatchToProps, por isso utilizei null.
