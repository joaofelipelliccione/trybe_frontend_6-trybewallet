import React from 'react';
import PropTypes from 'prop-types';

class PaymentTypeSelect extends React.Component {
  render() {
    const { onInputChange, typeOfPayment } = this.props;

    return (
      <label htmlFor="typeOfPayment">
        Método de pagamento
        <select
          data-testid="method-input"
          id="typeOfPayment"
          name="typeOfPayment"
          value={ typeOfPayment }
          onChange={ onInputChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentTypeSelect.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  typeOfPayment: PropTypes.string.isRequired,
};

export default PaymentTypeSelect;
