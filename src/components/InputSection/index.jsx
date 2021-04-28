import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import QuantityInput from "./QuantityInput";
import CurrencyInput from "./CurrencyInput";
import NameInput from "./NameInput";
import { truncateNumberToTwoDecimals } from "../../utils";
import "./styles.scss";

const InputSection = ({ onChange, resetForm, onResetCompletion }) => {
  const quantityInputRef = useRef("quantityInput");
  const itemNameInputRef = useRef("itemNameInput");
  const priceInputRef = useRef("priceInput");
  const importedSwitchRef = useRef("importedSwitchRef");

  useEffect(() => {
    if (resetForm) {
      onResetForm();
      onResetCompletion();
    }
  }, [resetForm, onResetCompletion]);

  const onAnyFieldChange = () => {
    onChange({
      quantity: Number(quantityInputRef.current.value),
      itemName: itemNameInputRef.current.value,
      unitPrice: truncateNumberToTwoDecimals(priceInputRef.current.value),
      isImported: importedSwitchRef.current.checked,
    });
  };

  const onResetForm = () => {
    quantityInputRef.current.value = 1;
    itemNameInputRef.current.value = "";
    priceInputRef.current.value = "";
    importedSwitchRef.current.checked = false;
  };

  return (
    <Form id="input-section">
      <div className="first-row-input">
        <QuantityInput ref={quantityInputRef} onChange={onAnyFieldChange} />
        <NameInput ref={itemNameInputRef} onChange={onAnyFieldChange} />
      </div>
      <div className="second-row-input">
        <CurrencyInput ref={priceInputRef} onChange={onAnyFieldChange} />
        <Form.Check
          ref={importedSwitchRef}
          onChange={onAnyFieldChange}
          type="switch"
          id="import-switch"
          label="Imported Product"
        />
      </div>
    </Form>
  );
};

InputSection.propTypes = {
  onChange: PropTypes.func,
  onResetCompletion: PropTypes.func,
  resetForm: PropTypes.bool
}

export default InputSection;
