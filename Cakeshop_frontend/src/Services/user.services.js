import httpClient from '../http-common';
const getProduct = (id) => {
    return httpClient.get(`/product/${id}`);
  }
  const getSpecificUserDetails = id => {
    return httpClient.get(`/user/getorder/${id}`);
  }
  const placeorders=(data)=>{
    return httpClient.post('/user/placeorder',data)
  }
  const payment=(data)=>{
    return httpClient.post('/api/payment',data);
  }

export default{getProduct,getSpecificUserDetails,placeorders,payment}