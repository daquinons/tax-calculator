import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const CurrencyInput = forwardRef(({ onChange }, ref) => {
  return (
    <div className="currency-input-container">
      <Form.Control
        type="number"
        onChange={onChange}
        step="0.01"
        min="0"
        ref={ref}
        pattern="[0-9]*"
        inputMode="decimal"
        placeholder={"Price"}
      />
    </div>
  );
});

CurrencyInput.propTypes = {
  onChange: PropTypes.func,
};

export default CurrencyInput;
