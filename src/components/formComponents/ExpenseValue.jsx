import React from 'react';
import PropTypes from 'prop-types';

class ExpenseValue extends React.Component {
  render() {
    const { onInputChange, expenseValue } = this.props;

    return (
      <label htmlFor="expenseValue">
        Valor
        <input
          data-testid="value-input"
          id="expenseValue"
          name="expenseValue"
          type="number"
          min="0"
          value={ expenseValue }
          onChange={ onInputChange }
        />
      </label>
    );
  }
}

ExpenseValue.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  expenseValue: PropTypes.string.isRequired,
};

export default ExpenseValue;
