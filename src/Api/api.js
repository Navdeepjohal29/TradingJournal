import axios from 'axios';

/*Function to Make a GET request on Given URL
  if request is ok 
  it will return the JSON object
  else

  throw Error
*/

export const fetchData = async () => {
    try {
      const response = await fetch('http://tradejournal.com:3001/api/trades');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
     
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  };


  

// Post user

export const createTrade= async(payload) =>{

try {
                
  // Make the POST request API server
  const response =  await axios.post('http://tradejournal.com:3001/api/addTrade', payload);

  // Check the response status
  if (response.status === 200) {
    // Successful response
    return true;
    
  } else {
    // Handle other response statuses if needed
    return false;
  }

} catch (error) {
  // Handle errors from the API request
  console.error('Error adding member:', error.message);
  return false;
}

};


export const editTrade = async(id, payload) =>{
  console.log("received in api", id, payload)
  try {
                  
    // Make the POST request to your Express server
    const response =  await axios.put(`http://tradejournal.com:3001/api/editTrade/${id}`, payload);
  
    // Check the response status
    if (response.status === 200) {
      // Successful response
      return true;
      
    } else {
      // Handle other response statuses if needed
      return false;
    }
  
  } catch (error) {
    // Handle errors from the API request
    console.error('Error adding member:', error.message);
    return false;
  }
  
  };

  //Delete user info

export const deleteTrade = async(id) =>{
  console.log("delete in api", id)

  
  try{
    const response =  await axios.delete(`http://tradejournal.com:3001/api/trades/${id}`);
  // Check the response status
  if (response.status === 200) {
    // Successful response
    return true;

    
  } else {
    // Handle other response statuses if needed
    return false;
  }

} catch (error) {
  // Handle errors from the API request
  console.error('Delete  trade failed:', id);

  console.error('Delete  trade failed:', error.message);

  return false;
}
  }