import React from 'react';
import PropTypes from 'prop-types';

class ExpenseTag extends React.Component {
  render() {
    const { onInputChange, expenseTag } = this.props;

    return (
      <label htmlFor="expenseTag">
        Tag
        <select
          data-testid="tag-input"
          id="expenseTag"
          name="expenseTag"
          value={ expenseTag }
          onChange={ onInputChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>

    );
  }
}

ExpenseTag.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  expenseTag: PropTypes.string.isRequired,
};

export default ExpenseTag;
