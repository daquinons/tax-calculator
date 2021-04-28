import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getTax } from "../../services/Tax";
import Transaction from "../Transaction";
import TotalDisplay from "../TotalDisplay";

const TransactionList = ({ transactionList }) => {
  const [taxedTransactionList, setTaxedTransactionList] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState({});
  useEffect(() => {
    const taxedTransactions = [];
    // Combines the transaction with the tax result in a unique object
    // that is passed to the Transaction component.
    transactionList.forEach((transaction) =>
      taxedTransactions.push({
        ...transaction,
        ...getTax(
          transaction.isImported,
          transaction.quantity,
          transaction.itemName,
          transaction.unitPrice
        ),
      })
    );
    setTaxedTransactionList(taxedTransactions);
    setTotalAmounts(calculateTotal(taxedTransactions));
  }, [transactionList]);

  const calculateTotal = (transactionList) => {
    let totalTaxes = 0;
    let totalPrices = 0;
    transactionList.forEach((transaction) => {
      totalTaxes += transaction.taxValue;
      totalPrices += transaction.unitPrice * transaction.quantity;
    });

    return {
      totalTaxes: totalTaxes.toFixed(2),
      total: (totalTaxes + totalPrices).toFixed(2),
    };
  };

  return (
    <div className="transaction-list">
      <TotalDisplay totalAmounts={totalAmounts} />
      {taxedTransactionList.map((transaction, index) => (
        <Transaction key={index} transaction={transaction} id={index} />
      ))}
    </div>
  );
};

TransactionList.propTypes = {
  transactionList: PropTypes.array
}

export default TransactionList;
