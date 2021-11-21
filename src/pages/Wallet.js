import React from 'react';
import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div id="walletPage">
        <Header />
        <AddExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

export default Wallet;
