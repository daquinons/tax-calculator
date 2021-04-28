import { Alert } from 'react-bootstrap';

const TotalDisplay = ({ totalAmounts }) => {
  const { total, totalTaxes } = totalAmounts;
  return total && total !== "0.00" ? (
    <Alert variant="primary" className="total-display">
      <h2>Receipt</h2>
      <p>Sales Taxes: {totalTaxes}</p>
      <p>Total: {total}</p>
    </Alert>
  ) : null;
};

export default TotalDisplay;
