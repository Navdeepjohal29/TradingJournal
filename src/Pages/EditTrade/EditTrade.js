import React, { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import { Form, Button, Alert ,Modal} from 'react-bootstrap';
import { editTrade } from '../../Api/api'

const EditTrade = ({ trade,  ...props }) => {
    const [ticker, setTicker] = useState("");
  const [outcome, setOutcome] = useState("");
  const [amount, setAmount] = useState(" ");
  const [action, setAction] = useState("");
  const [tradeid, setTradeId] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (trade) {
        setTicker(trade.ticker || ""); 
        setOutcome(trade.result || ""); 
        setAmount(trade.amount || "");        
        setAction(trade.action || ""); 
        setTradeId(trade.id);
    }
}, [trade]);


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


  const handleSave = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrors({});
 
      const isValid = validateForm();
      if (isValid) {
        const payload = {
          "ticker": ticker,
          "action": action,
          "outcome": outcome,
          "amount": amount,
        //   "trade_execute_date":selectedDate.toUTCString()
        };
        console.log("my edit payload is",tradeid,payload)
        const isSuccess = await editTrade(tradeid, payload);
        console.log("my edit success is", isSuccess)

        if (isSuccess === true) {
          setMessage("Trade edit successfully");
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
    
       <Modal show={props.showEditModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        {message && (
          <Alert variant={Object.keys(errors).length > 0 ? "danger" : "success"} className="mt-3">
            {message}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ticker</Form.Label>
          <Form.Control type="text" placeholder="Enter Ticker" value={ticker} autoComplete="off" required onChange={(e) => setTicker(e.target.value)} />
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
                id={`inline-${type}-3`}
              />

              <Form.Check
                autoComplete="off" required
                inline
                label="Put"
                name="group1"
                type={type}
                id={`inline-${type}-4`}
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
                name="group2"
                type={type}
                checked={outcome === "Profit"}
                onChange={() => setOutcome("Profit")}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="Loss "
                name="group2"
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
          <Form.Control type="text" autoComplete="off" value={amount} required placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} error={errors.amount} />
          <span className="error danger text-danger text-success">{errors.amount}</span>
        </Form.Group>

        <Button onClick={handleSave} variant="primary" type="submit">
          Save
        </Button>
      </Form>
        </Modal.Body>
      </Modal>
   
    </>

  );
};

export default EditTrade;
