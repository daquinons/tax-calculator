import { useState } from "react";
import { Button } from "react-bootstrap";
import Layout from "../Layout";
import InputSection from "../InputSection";
import TransactionList from "../TransactionList";
import "./styles.scss";

function App() {
  const [transactionInput, setTransactionInput] = useState({});
  const [transactionList, setTransactionList] = useState([]);
  const [didSubmitTransaction, setDidSubmitTransaction] = useState(false);

  const onAddTransaction = () => {
    const { quantity, unitPrice, itemName } = transactionInput;
    if (quantity > 0 && unitPrice > 0 && itemName) {
      setTransactionList([...transactionList, transactionInput]);
      setTransactionInput({});
      setDidSubmitTransaction(true);
    } else {
      if (!itemName) {
        alert("Item is mandatory");
        return;
      }

      if (!quantity) {
        alert("Item quantity must be a number bigger than 0");
        return;
      }

      if (unitPrice === 0) {
        alert("Price must be bigger than 0");
        return;
      }
    }
  };

  const onClearTransactionList = () => {
    setTransactionList([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tax Calculator 🧾</h1>
      </header>
      <Layout>
        <InputSection
          onChange={setTransactionInput}
          resetForm={didSubmitTransaction}
          onResetCompletion={() => setDidSubmitTransaction(false)}
        />
        <div className="action-buttons-container">
          <Button variant="danger" onClick={onClearTransactionList}>Clear List</Button>
          <Button onClick={onAddTransaction}>Add Transaction</Button>
        </div>
        <TransactionList transactionList={transactionList} />
      </Layout>
    </div>
  );
}

export default App;
