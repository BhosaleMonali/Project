import httpClient from '../http-common';

const login = (data) => {
  return httpClient.post('/user/login', data);
};

const register = (data) => {
  return httpClient.post('/user/register', data);
};
const getSpecificUserDetails = id => {
  return httpClient.get(`/admin/userdetails/${id}`)
}
const getUsersList = () => {
  return httpClient.get('/admin/allusers');
}
const removeuser = id => {
  return httpClient.delete(`/user/${id}`)
}
const getProductList = () => {
  return httpClient.get('/products')

}
const updateProduct=(data)=>{
  return httpClient.put('/admin/updatestatus',data)
}
const orderDetail=() => {
  return httpClient.get('/admin/allorders')
}
const addProduct = (data, image) => {
  const formData = new FormData();

  // Append the product data to the FormData
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  // Append the image file to the FormData
  formData.append('image', image);
  // return httpClient.post(`/admin/product/`, data,image)
  return httpClient.post(`/admin/product/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
// const addProduct = (data, image) => {
//   return httpClient.post('/admin/product/', data, image)
// }
const removeProduct = (id) => {
  return httpClient.delete(`/product/${id}`)
}
export default {
  login, register, getSpecificUserDetails, getUsersList, removeuser,
  addProduct, getProductList, removeProduct,orderDetail,updateProduct
};