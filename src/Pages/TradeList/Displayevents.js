import React, { useState, useEffect } from 'react';
import {fetchData} from '../../Api/api';
import TradeList from './TradeList';

const Displayevents = ()=>{

  const [users, setUsers] = useState([]);

  useEffect(() => { 
    //await for fetchdata() to send response.
    const fetchUsers = async () => {
      try {
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        console.error('Error in DisplayUsers:', error.message);
      }
    };

    fetchUsers();
  }, []);

    return (
        <div>
        <TradeList trades={users}  />
        </div>
    );
    }
  export default Displayevents;