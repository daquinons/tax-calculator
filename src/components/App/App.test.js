import { render, screen, fireEvent } from "@testing-library/react";
import App from ".";

test("renders header", () => {
  render(<App />);
  const titleElement = screen.getByText(/Tax Calculator/i);
  expect(titleElement).toBeInTheDocument();
});

test("does not render Total if no transactions", () => {
  render(<App />);
  const receiptElement = screen.queryByText("Receipt");
  expect(receiptElement).toBeNull();
});

test("renders Receipt when transaction is entered", async () => {
  const app = render(<App />);
  const inputName = app.getByPlaceholderText("Product Name");
  fireEvent.change(inputName, { target: { value: "Test Name" } });
  expect(inputName.value).toBe("Test Name");
  const inputPrice = app.getByPlaceholderText("Price");
  fireEvent.change(inputPrice, { target: { value: "1" } });
  const addButton = app.getByText("Add Transaction");
  await fireEvent.click(addButton);
  const receiptElement = screen.queryByText("Receipt");
  expect(receiptElement).not.toBeNull();
});

test("renders transaction when transaction is entered", async () => {
  const app = render(<App />);
  const inputName = app.getByPlaceholderText("Product Name");
  fireEvent.change(inputName, { target: { value: "Test Name" } });
  expect(inputName.value).toBe("Test Name");
  const inputPrice = app.getByPlaceholderText("Price");
  fireEvent.change(inputPrice, { target: { value: "1" } });
  const addButton = app.getByText("Add Transaction");
  await fireEvent.click(addButton);
  const transactionName = app.getByText("Test Name");
  expect(transactionName).toBeInTheDocument();
  const quantityText = app.getByText("Quantity: 1");
  expect(quantityText).toBeInTheDocument();
  const totalText = app.getAllByText("Total: 1.10");
  expect(totalText).toHaveLength(2);
});

test("clears transactions when Clear List button is clicked", async () => {
  const app = render(<App />);
  const inputName = app.getByPlaceholderText("Product Name");
  fireEvent.change(inputName, { target: { value: "Test Name" } });
  expect(inputName.value).toBe("Test Name");
  const inputPrice = app.getByPlaceholderText("Price");
  fireEvent.change(inputPrice, { target: { value: "1" } });
  const addButton = app.getByText("Add Transaction");
  await fireEvent.click(addButton);
  const transactionName = app.getByText("Test Name");
  expect(transactionName).toBeInTheDocument();
  const clearButton = app.getByText("Clear List");
  await fireEvent.click(clearButton);
  expect(transactionName).not.toBeInTheDocument();
});

test("adds imported tax and label when switch is selected", async () => {
  const app = render(<App />);
  const inputName = app.getByPlaceholderText("Product Name");
  fireEvent.change(inputName, { target: { value: "Test Name" } });
  expect(inputName.value).toBe("Test Name");
  await fireEvent.click(app.getByLabelText(/imported/i))
  const inputPrice = app.getByPlaceholderText("Price");
  await fireEvent.change(inputPrice, { target: { value: "1" } });
  const addButton = app.getByText("Add Transaction");
  await fireEvent.click(addButton);
  const transactionName = app.getByText("Test Name");
  expect(transactionName).toBeInTheDocument();
  const importedText = app.getAllByText(/imported/i)
  expect(importedText).toHaveLength(2);
  const totalText = app.getAllByText("Total: 1.20");
  expect(totalText).toHaveLength(2);
});
