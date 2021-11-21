import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
import { deleteExpenseAC as delExpAC } from '../actions'; // Importação da Action Creator responsável pelo requisito 8.

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.deleteExpAndUpdateTotal = this.deleteExpAndUpdateTotal.bind(this);
  }

  deleteExpAndUpdateTotal({ target }) { // Função responsável pela execução das demandas do requisito 8.
    const { expensesArrayProp, delExpProp } = this.props;

    // Lógica para retirar uma despesa do estado global 'expenses'.
    const updatedExpArray = [];

    const updatedExpArrayIdWrong = expensesArrayProp
      .filter((expObj) => expObj.id !== Number(target.id));

    updatedExpArrayIdWrong.forEach((expObj, index) => {
      expObj.id = index;
      updatedExpArray.push(expObj);
    });

    // Lógica para atualizar o estado global 'totalExpValueBRL', após a deleção da despesa acima.
    const deletedExpValue = Number(expensesArrayProp // Ex: 10.78
      .find((expObj) => expObj.id === Number(target.id)).value);

    const delExpValCurrency = expensesArrayProp // Ex: USD
      .find((expObj) => expObj.id === Number(target.id)).currency;

    const delExpValCurrQuotation = Number(expensesArrayProp // Ex: 5.614
      .find((expObj) => expObj.id === Number(target.id))
      .exchangeRates[delExpValCurrency].ask);

    const delExpValBRL = Number(deletedExpValue * delExpValCurrQuotation); // Ex: USD 10.78 * R$ 5.614

    // Dispatch para atualizar a reducer Wallet e, consequentemente, a Store.
    delExpProp(updatedExpArray, delExpValBRL);
  }

  render() {
    const thContent = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    const { expensesArrayProp } = this.props;

    return (
      <table>
        <thead>
          <tr>
            { thContent.map((title) => (
              <th scope="col" key={ title }>{ title }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { expensesArrayProp.map((expObj) => (
            <tr key={ expObj.id }>
              <td>{ expObj.description }</td>
              <td>{ expObj.tag }</td>
              <td>{ expObj.method }</td>
              <td>{ Number(expObj.value).toFixed(0) }</td>
              <td>{ (expObj.exchangeRates[expObj.currency].name).split('/')[0] }</td>
              <td>{ Number(expObj.exchangeRates[expObj.currency].ask).toFixed(2) }</td>
              <td>
                { (expObj.exchangeRates[expObj.currency].ask * expObj.value).toFixed(2) }
              </td>
              <td>Real</td>
              <td id={ expObj.id }>
                <button
                  data-testid="delete-btn"
                  id={ expObj.id }
                  type="button"
                  onClick={ this.deleteExpAndUpdateTotal }
                >
                  Deletar Linha
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expensesArrayProp: PropTypes.arrayOf(PropTypes.object).isRequired,
  delExpProp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expensesArrayProp: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpProp: (updatedExpArr, delExpBRL) => dispatch(delExpAC(updatedExpArr, delExpBRL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
