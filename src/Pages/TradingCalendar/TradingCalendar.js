import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import {  useNavigate } from 'react-router-dom';
import AddTrade from './AddTrade';
import 'react-calendar/dist/Calendar.css';
import './style.scss'
import { Button, Container, Row } from 'react-bootstrap';

const TradingCalendar = () => {
  const [trades, setTrades] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tradeData, setTradeData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trades from your API
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    // Mocked trade data
    try {
      const response = await fetch('http://tradejournal.com:3001/api/trades'); // Replace with your API endpoint
      const res = await response.json();
      console.log("result is", res)
      setTrades(res);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }

  };
  useEffect(() => {
    // Calculate trade counts per day
    const data = {};
    trades.forEach(trade => {
      const date = new Date(trade.trade_execute_date).toISOString().split('T')[0];
      if (!data[date]) {
        data[date] = { count: 0, totalQuantity: 0 };
      }
      data[date].count++;
      if (trade.result == "Profit") {
        data[date].totalQuantity += Number(trade.amount);
      }
      else {
        data[date].totalQuantity -= Number(trade.amount);
      }

    });
    setTradeData(data);
  }, [trades]);
  
  const handleTileClick = (date) => {
    console.log("selectedDateCalendar", date);
    setSelectedDate(date);
    navigate("/tradeList", { state: { trades: date } });


  };
   

  const handleTileContent = ({ date }) => {
   
    const dateString = date.toISOString().split('T')[0];
    const filteredTrades = trades.filter(trade => trade.trade_execute_date.split('T')[0] === dateString);
    const data = tradeData[dateString] || { count: 0, totalQuantity: 0 };

    return (
      <div onClick={() => handleTileClick(date)} ><a className='white-text'> {data.count}</a> <div> $ {data.totalQuantity} </div> </div>
     
 );
    };



const handleDateChange = (date) => {
  setSelectedDate(date instanceof Date ? date : date[0]); 
};


return (
  <Container>
    <Row>
      <div className="trade-calendar">
        <h2 className='mt-4'>Trading Calendar</h2>
        <div className=" calendar-container" >
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={handleTileContent}
            onClickDay={handleTileClick}
            tileClassName={({ date, view }) => {
              const dateString = date.toISOString().split('T')[0];
              const data = tradeData[dateString] || { totalQuantity: 0 };
          
              // Determine the class name based on profit/loss
              let tileClassName = 'react-calendar__tile';
              if (data.totalQuantity > 0) {
                tileClassName += ' profit-tile'; // Profit class
              } else if (data.totalQuantity < 0) {
                tileClassName += ' loss-tile'; // Loss class
              }
          
              return tileClassName;
            }}
          />

        </div>

      </div>
    </Row>
  </Container>
);
};

export default TradingCalendar;
