import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import { createTrade } from '../../Api/api'

const AddTrade = ({ selectedDate }) => {
  const [ticker, setTicker] = useState('');
  const [outcome, setOutcome] = useState('');
  const [amount, setAmount] = useState('');
  const [action, setAction] = React.useState("");
  // const [selectedDate, setSelectedDate] = React. (null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const localDate = new Date();
  const utcDate = localDate.toUTCString();
  console.log("UTC Date:", utcDate);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic for each field
    if (ticker.trim() === "") {
      newErrors.ticker = "Ticker is required";
      isValid = false;
    }
    if (outcome.trim() === "") {
      newErrors.outcome = "outcome is required";
      isValid = false;
    }
    if (amount.trim() === "") {
      newErrors.amount = "Amount is required";
      isValid = false;
    }
    if (action.trim() === "") {
      newErrors.action = "Action is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleSelectslot = (date) => {
  //   setSelectedDate(date);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset previous messages and errors
    setMessage(null);
    setErrors({});
 
      const isValid = validateForm();
      console.log("datechnge", selectedDate);
      if (isValid) {
        const payload = {
          "ticker": ticker,
          "action": action,
          "outcome": outcome,
          "amount": amount,
          "trade_execute_date":selectedDate.toUTCString()
        };
        //onSelectSlot(payload);
        console.log("payload is",payload)
        const isSuccess = await createTrade(payload);
        if (isSuccess === true) {
          setMessage("Trade added successfully");
          // First show message then it will navigate to list member page
          setTimeout(() => {
            navigate('/tradingcalendar');
          }, 1000);
        } else {
          setMessage("Some error occurred");
        }
      }
    
  };

  return (
    <>
      <Form>
        {message && (
          <Alert variant={Object.keys(errors).length > 0 ? "danger" : "success"} className="mt-3">
            {message}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ticker</Form.Label>
          <Form.Control type="text" placeholder="Enter Ticker" autoComplete="off" required onChange={(e) => setTicker(e.target.value)} />
          <span className="error danger text-danger text-success">{errors.ticker}</span>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Action</Form.Label>
          {['checkbox'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                autoComplete="off" required
                inline
                label="Call"
                name="group1"
                type={type}
                checked={action === "Call"}
                onChange={(e) => setAction("Call")}
                id={`inline-${type}-1`}
              />

              <Form.Check
                autoComplete="off" required
                inline
                label="Put"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                checked={action === "Put"}
                onChange={() => setAction("Put")}

              />
              <span className="error danger text-danger text-success">{errors.action}</span>
            </div>
          ))}

        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Result</Form.Label>
          {['checkbox'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                autoComplete="off" required
                inline
                label="Profit"
                name="group1"
                type={type}
                checked={outcome === "Profit"}
                onChange={() => setOutcome("Profit")}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Loss "
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                checked={outcome === "Loss"}
                onChange={() => setOutcome("Loss")}

              />
              <span className="error danger text-danger text-success">{errors.outcome}</span>
            </div>
          ))}

        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Amount</Form.Label>
          <Form.Control type="text" autoComplete="off" required placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} error={errors.amount} />
          <span className="error danger text-danger text-success">{errors.amount}</span>
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>

  );
};

export default AddTrade;
