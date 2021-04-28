import PropTypes from "prop-types";
import { Card, Badge } from "react-bootstrap";
import "./styles.scss";

const Transaction = ({ transaction }) => {
  const {
    quantity,
    itemName,
    unitPrice,
    isImported,
    taxValue,
  } = transaction;

  const formatPrice = (price) => price.toFixed(2);

  const formatTotalPrice = (unitPrice, quantity, taxValue) => {
    return formatPrice(unitPrice * quantity + taxValue);
  };

  return (
    <div className="transaction-element-container">
      <Card className="transaction-element">
        <Card.Body>
          <Card.Title>
            {isImported && (
              <Badge pill variant="primary">
                Imported
              </Badge>
            )}{" "}
            {itemName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Quantity: {quantity}
          </Card.Subtitle>
          <Card.Text>
            Total: {formatTotalPrice(unitPrice, quantity, taxValue)}{" "}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.shape({
    isImported: PropTypes.bool,
    itemName: PropTypes.string,
    quantity: PropTypes.number,
    taxValue: PropTypes.number,
    unitPrice: PropTypes.number
  })
}

export default Transaction;
