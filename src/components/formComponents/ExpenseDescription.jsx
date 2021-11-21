import React from 'react';
import PropTypes from 'prop-types';

class ExpenseDescription extends React.Component {
  render() {
    const { onInputChange, expenseDescription, addExpenseWithEnter } = this.props;

    return (
      <label htmlFor="expenseDescription">
        Descrição
        <input
          data-testid="description-input"
          id="expenseDescription"
          name="expenseDescription"
          type="text"
          value={ expenseDescription }
          onChange={ onInputChange }
          onKeyPress={ (event) => event.key === 'Enter'
            && addExpenseWithEnter(event) } // Habilita adição de despesa com a tecla 'Enter'.
        />
      </label>
    );
  }
}

ExpenseDescription.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  expenseDescription: PropTypes.string.isRequired,
  addExpenseWithEnter: PropTypes.func.isRequired,
};

export default ExpenseDescription;
