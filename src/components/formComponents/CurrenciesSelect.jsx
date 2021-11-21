import React from 'react';
import PropTypes from 'prop-types';

class CurrenciesSelect extends React.Component {
  render() {
    const { onInputChange, currency, currenciesArrayProp } = this.props;

    return (
      <label htmlFor="currency">
        Moeda
        <select
          data-testid="currency-input"
          id="currency"
          name="currency"
          value={ currency }
          onChange={ onInputChange }
        >
          {currenciesArrayProp.map((curr) => (
            <option key={ curr } value={ curr }>{ curr }</option>
          ))}
        </select>
      </label>
    );
  }
}

CurrenciesSelect.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  currenciesArrayProp: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CurrenciesSelect;
