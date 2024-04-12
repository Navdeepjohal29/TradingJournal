import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import TradingCalendar from "../Pages/TradingCalendar/TradingCalendar";
import TradeList from "../Pages/TradeList/TradeList";
import EditTrade from "../Pages/EditTrade/EditTrade";



const   PrivateRoute = () => {
  return (
    <>
    <Routes>
     <Route path="/" element={<Dashboard />}></Route>
     <Route path="/tradingcalendar" element={<TradingCalendar />}></Route>
     <Route path="/tradeList" element={<TradeList />}></Route>
     <Route path="/EditTrade" element={<EditTrade />}></Route>

    </Routes>
    </>
  );
};

export default PrivateRoute;