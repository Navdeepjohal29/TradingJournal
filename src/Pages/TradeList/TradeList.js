import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Container, Table, Button,Modal } from 'react-bootstrap';
import { fetchData } from '../../Api/api';
import EditTrade from '../EditTrade/EditTrade';
import AddTrade from '../TradingCalendar/AddTrade';

import DeleteTrade from './DeleteTrade';


const TradeList = () => {
    const loc = useLocation();
    const { trades } = loc.state || {};
    const [listResult, setListResult] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [showTable, setShowTable] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedDeleteTrade, setSelectedDeleteTrade] = useState(null);


    const handleEdit = (trade) => {
        setSelectedTrade(trade);
        setShowEditModal(true);
    };
    const handleDelete = (trade) => {
        setSelectedDeleteTrade(trade);
        console.log("in handle delete",trade)
        setDeleteModal(true);
    };
    useEffect(() => {
        //await for fetchdata() to send response.
        const fetchTrades = async () => {
            const data = await fetchData();
            console.log("fetchTrades",data);
            const parsedSelectedDate = new Date(trades);
            setSelectedDate(parsedSelectedDate); 
            const year = parsedSelectedDate.getFullYear();
            const month = String(parsedSelectedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
            const day = String(parsedSelectedDate.getDate()).padStart(2, '0');
            const formattedSelectedDate = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];
            const filteredData = data.filter(trade => {
                const tradeDate = new Date(trade.trade_execute_date);
                const formattedTradeDate = tradeDate.toISOString().split('T')[0];
                return formattedTradeDate === formattedSelectedDate;
                
            });
            //2024-03-14T20:07:48.679Z
            setListResult(filteredData);
            setShowTable(filteredData.length > 0); 
        };
        fetchTrades();
    }, [trades]);

  
    return (
        <Container>
            <div className='d-flex mt-4 mb-4 justify-content-between '>
               <h2>My Trades</h2>
    
            <Button  variant="primary" onClick={handleShow}>Add Trade</Button>
            </div>
            <p>Selected Date: {trades.toDateString()}</p> 
           
            {showTable && (
                <div className='table'>
            <Table striped bordered hover className='overflow-scroll'>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Action</th>
                        <th>Result</th>
                        <th>Amount</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
               {/* Display selected date here */}
            
               
                    {listResult.map((trade, index) => (
                        <tr key={index} className="event">
                            <td>
                                {trade.ticker}
                            </td>
                            <td>
                                {trade.action}
                            </td>
                            <td>
                                {trade.result}
                            </td>
                            <td>
                                {trade.amount}
                            </td>
                            <td> <Button onClick={() => handleEdit(trade)} variant="primary">Edit</Button>
                            <EditTrade showEditModal={showEditModal} handleClose={() => setShowEditModal(false)} trade={selectedTrade} />

                            </td>
                            <td>
                            <Button onClick={() => handleDelete(trade)} variant="primary">Delete</Button>
                            <DeleteTrade showDeleteModal={showDeleteModal} handleClose={() => setDeleteModal(false)} trade={selectedDeleteTrade} />

                            </td>
                        </tr>
                    ))}
                </tbody>
               
            </Table>
       
            </div>
              )}

              
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Trade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <AddTrade selectedDate={selectedDate} />
                </Modal.Body>
            </Modal>
           {!showTable && (
          <div> <p className='text-center mt-5 w-100'>No Trade. Please add your trade </p> </div>
      )}
        </Container>
    );

}



export default TradeList;