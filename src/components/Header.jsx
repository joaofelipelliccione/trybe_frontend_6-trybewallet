import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { userMailProp, totalExpenseBRLProp } = this.props;

    return (
      <header id="websiteHeader">
        <h1>LOGO AQUI</h1>
        <div id="userMailAndTotalExpensesContainer">
          <span data-testid="email-field">{ `E-mail: ${userMailProp}` }</span>
          <span>
            Despesa Total: R$
            <output data-testid="total-field">
              { ` ${!totalExpenseBRLProp ? 0 : Number(totalExpenseBRLProp).toFixed(2)}` }
            </output>
            <output data-testid="header-currency-field"> BRL</output>
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
