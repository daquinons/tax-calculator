import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const NameInput = forwardRef(({ onChange }, ref) => {
  return (
    <div className="name-input-container">
      <Form.Control ref={ref} onChange={onChange} placeholder="Product Name" />
    </div>
  );
});

NameInput.propTypes = {
  onChange: PropTypes.func
}

export default NameInput;
