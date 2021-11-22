import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
import { deleteExpenseAC, dataFromLocStoAC } from '../actions'; // Importação da Action Creator responsável pelo requisito 8.
import '../styles/expensesTable.css';

class ExpensesTable extends React.Component {
  constructor() {
    super();

    this.deleteExpAndUpdateTotal = this.deleteExpAndUpdateTotal.bind(this);
  }

  componentDidUpdate() { // Função que permite a atualização do local storage sempre quando a ExpensesTable é atualizada de alguma forma (inserção de despesa, deleção de despesa...).
    const { userMailProp, expensesArrayProp, totalExpValueBRLProp } = this.props;
    localStorage.setItem(`${userMailProp}-expensesArray`, JSON.stringify(expensesArrayProp));
    localStorage.setItem(`${userMailProp}-totalExpValueBRL`, JSON.stringify(totalExpValueBRLProp));
  }

  componentDidMount() {
    const { dataFromLocStoProp } = this.props;
    const userMailFromLS = JSON.parse(localStorage.getItem('userMail')); // Precisei captar o 'userMail' oriundo do LS pois, sempre que a página for atualizada, o 'userMail' oriundo da Store é zerado.
    const expArrayFromLS = JSON.parse(localStorage.getItem(`${userMailFromLS}-expensesArray`));
    const totalExpBRLFromLS = JSON.parse(localStorage.getItem(`${userMailFromLS}-totalExpValueBRL`));

    // Atualização da key 'expenses' e 'totalExpValueBRL', da store, com o conteúdo oriundo do local storage do usuário logado.
    dataFromLocStoProp(expArrayFromLS, totalExpBRLFromLS);
    // OBS: É importante lembrar que, caso o usuário esteja logando pela primeira vez, no momento que a página de Login ('/') for 'unMounted', a key 'emailUsuário-expensesArray' será definida como '[]' e a key 'emailUsuário-totalExpValueBRL' será definida como '0', no local storage.
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
      'Valor convertido', 'Moeda de conversão', 'Excluir'];
    const { expensesArrayProp } = this.props;

    return (
      <table id="expensesTable">
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
              <td>{ `${expObj.currency} ${Number(expObj.value).toFixed(2)}` }</td>
              <td>{ (expObj.exchangeRates[expObj.currency].name).split('/')[0] }</td>
              <td>{ `R$ ${Number(expObj.exchangeRates[expObj.currency].ask).toFixed(2)}` }</td>
              <td>
                { `R$ ${(expObj.exchangeRates[expObj.currency].ask * expObj.value).toFixed(2)}` }
              </td>
              <td>{ (expObj.exchangeRates[expObj.currency].name).split('/')[1] }</td>
              <td id={ expObj.id }>
                <button
                  data-testid="delete-btn"
                  id={ expObj.id }
                  type="button"
                  onClick={ this.deleteExpAndUpdateTotal }
                >
                  <span role="img" aria-label="Emoji de Deleção">🗑️</span>
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
  totalExpValueBRLProp: PropTypes.number.isRequired,
  userMailProp: PropTypes.string.isRequired,
  dataFromLocStoProp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expensesArrayProp: state.wallet.expenses,
  totalExpValueBRLProp: state.wallet.totalExpValueBRL, // Captando o estado que armazena o somatório de todas as despesas.
  userMailProp: state.user.email, // Captando o estado que armazena o e-mail da pessoa logada.
});

const mapDispatchToProps = (dispatch) => ({
  delExpProp: (updatedExpArr, delExpBRL) => dispatch(deleteExpenseAC(updatedExpArr, delExpBRL)),
  dataFromLocStoProp: (savedExpArr, savedTotalExpBRL) => dispatch(dataFromLocStoAC(savedExpArr, savedTotalExpBRL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
