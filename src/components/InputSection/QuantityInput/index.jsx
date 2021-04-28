import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import "./styles.scss";

const QuantityInput = forwardRef((props, ref) => {
  return (
    <div className="quantity-input-container">
      <Form.Control
        {...props}
        ref={ref}
        type="number"
        className="quantity-input-field"
        defaultValue={1}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        min={1}
      />
    </div>
  );
});

export default QuantityInput;
