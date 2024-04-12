import React, {useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button,Modal } from 'react-bootstrap';
import {deleteTrade } from '../../Api/api'


const DeleteTrade = ({ trade,  ...props }) => {
    console.log("delete trade is", trade)
    const [tradeId, setTradeId] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


  useEffect(() => {
    if (trade) {
        setTradeId(trade.id);
    }
}, [trade]);
    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage(null);
        setErrors({});
        const isSucess = await deleteTrade(tradeId);
        if (isSucess === true) {
            setMessage("Trade Deleted  successfully");
            setTimeout(() => {
                navigate('/tradingcalendar');
            }, 1000);
        }
        else {
            setMessage(" Some error occured");
    
        }
    
    };
    return (
        <Modal show={props.showDeleteModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to Delete Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button className="del-btn" onClick={handleDelete}> Delete</Button>
        </Modal.Body>
      </Modal>
    );

}



export default DeleteTrade;