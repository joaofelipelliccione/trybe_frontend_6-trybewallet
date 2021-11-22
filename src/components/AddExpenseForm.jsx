import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Importação do connect para "conectar" o respectivo componente ao Redux.
// Importação da Action Creator Thunk, para que seja possível realizar a requisição.
// Importação da Action Creator responsável pelo requisito 4.
import { fetchCurrencies, addNewExpenseAC } from '../actions';
import ExpenseValue from './formComponents/ExpenseValue';
import CurrenciesSelect from './formComponents/CurrenciesSelect';
import PaymentTypeSelect from './formComponents/PaymentTypeSelect';
import ExpenseTag from './formComponents/ExpenseTag';
import ExpenseDescription from './formComponents/ExpenseDescription';
import '../styles/addExpenseForm.css';

class AddExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      expenseValue: '0',
      currency: 'USD',
      typeOfPayment: 'Dinheiro',
      expenseTag: 'Alimentação',
      expenseDescription: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onAddExpense = this.onAddExpense.bind(this);
    this.addExpenseWithEnter = this.addExpenseWithEnter.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesProp } = this.props;
    fetchCurrenciesProp(); // Realizando requisição e a salvando na store.
  }

  onInputChange({ target }) { // Função que altera o valor do estado local, sempre que um input for realizado no elemento onde ela está sendo chamada. || OBS: Para que tal função funcione, os 'name' de cada um dos elementos do Forms devem ser iguais ao nome dos estados.
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  async onAddExpense() { // Função que realiza tudo o que o requisito 4 demanda.
    const { fetchCurrenciesProp, currenciesDataProp,
      expensesArrayProp, addNewExpProp } = this.props;
    await fetchCurrenciesProp();

    const {
      expenseValue,
      currency,
      typeOfPayment,
      expenseTag,
      expenseDescription,
    } = this.state;

    const newExpense = {
      id: expensesArrayProp.length,
      value: expenseValue,
      currency,
      method: typeOfPayment,
      tag: expenseTag,
      description: expenseDescription,
      exchangeRates: currenciesDataProp,
    };

    const currentQuotation = Number(currenciesDataProp[currency].ask);
    const currentExpBRL = (expenseValue * currentQuotation);
    addNewExpProp(newExpense, currentExpBRL);
    this.setState({ expenseValue: '0', expenseTag: 'Alimentação', expenseDescription: '',  });
  }

  addExpenseWithEnter(e) { // Permite adicionar nova despesa pressionando a tecla Enter. --> Feature extra!
    e.preventDefault();
    this.onAddExpense();
  }

  render() {
    const { expenseValue, currency, typeOfPayment,
      expenseTag, expenseDescription } = this.state;
    const { currenciesArrayProp } = this.props;

    return (
      <form id="addExpenseForm">
        <ExpenseValue
          onInputChange={ this.onInputChange }
          expenseValue={ expenseValue }
        />
        <CurrenciesSelect
          onInputChange={ this.onInputChange }
          currency={ currency }
          currenciesArrayProp={ currenciesArrayProp }
        />
        <PaymentTypeSelect
          onInputChange={ this.onInputChange }
          typeOfPayment={ typeOfPayment }
        />
        <ExpenseTag
          onInputChange={ this.onInputChange }
          expenseTag={ expenseTag }
        />
        <ExpenseDescription
          onInputChange={ this.onInputChange }
          expenseDescription={ expenseDescription }
          addExpenseWithEnter={ this.addExpenseWithEnter }
        />
        <button
          id="addExpenseBtn"
          type="button"
          onClick={ this.onAddExpense }
        >
          <span role="img" aria-label="Emoji de Adição">➕</span>
        </button>
      </form>
    );
  }
}

AddExpenseForm.propTypes = {
  currenciesArrayProp: PropTypes.arrayOf(PropTypes.string).isRequired,
  currenciesDataProp: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  expensesArrayProp: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCurrenciesProp: PropTypes.func.isRequired,
  addNewExpProp: PropTypes.func.isRequired,
  totalExpValueBRLProp: PropTypes.number.isRequired,
  userMailProp: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesArrayProp: state.wallet.currencies, // Captando o array ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', ...], sem 'USDT'.
  currenciesDataProp: state.wallet.currenciesData, // Captando o objeto que armazena todas as informações, de cada moeda.
  expensesArrayProp: state.wallet.expenses, // Captando o array que armazena todas as despesas.
  totalExpValueBRLProp: state.wallet.totalExpValueBRL, // Captando o estado que armazena o somatório de todas as despesas.
  userMailProp: state.user.email, // Captando o estado que armazena o e-mail da pessoa logada.
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: () => dispatch(fetchCurrencies()),
  addNewExpProp: (newExpObj, expBRL) => dispatch(addNewExpenseAC(newExpObj, expBRL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
