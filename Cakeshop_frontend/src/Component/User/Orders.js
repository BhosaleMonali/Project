import { useEffect, useState } from 'react';
import userServices from '../../Services/user.services';
import { useNavigate } from "react-router-dom";
import UserNavBar from './UserNavBar';
import Footer from '../Footer';

function Orders() {

    const [isDisabled, setIsDisabled] = useState(true)
    const [userId, setUserId] = useState('')
    const navigate = useNavigate()
    const [order, setOrder] = useState([])
    const [id,setId]=useState('')
    // const[orderstatus,setOrderStatus]=useState('')
    

    const init = () => {
        var val = localStorage.getItem('user-token');
        var object = JSON.parse(val);
        setUserId(object.userId)
        console.log("id"+object.userId);
        userServices.getSpecificUserDetails(object.userId)
            .then(response => {
                console.log("Order Details", response.data)
                setOrder(response.data)
            })
            .catch(error => {
                console.log("Something Went Wrong", error)
            })
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <UserNavBar />
            <div className="container-fluid">
                <h3 class="my-1 mt-5 text-center text-primary fw-bold">List of Order Details</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-info mb-3" onClick={() => { navigate("/user") }}> <i class="fa fa-home" aria-hidden="true"></i>  Go To Back Page</button>
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr className="table-primary">
                                <th>Order Id</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Weigth(Kg)</th>
                                <th>Message On Cake</th>
                                <th>Amount</th>
                                <th>Order Status</th>
                                {/* <th>Delivery Date</th> */}
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.map(o => (
                                    <tr key={o.id} >
                                        <td>{o.id}</td>
                                        <td>{o.product.title}</td>                                       
                                        <td>{o.quantity}</td>
                                        <td>{o.weight}</td>
                                        <td>{o.message}</td>
                                        <td>{o.amount}</td>
                                        <td>{o.orderStatus}</td>
                                    {o.orderStatus === 'Accepted' && (
                                        <td>
                                            {/* Render your payment button here */}
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() => {
                                                    // Handle payment logic
                                                    console.log('Payment button clicked for Order ID:', o.id);
                                                    navigate('/user/paymentform');
                                                }}
                                            >
                                                Pay Now
                                            </button>
                                        </td>
                                    )}
                                        
                                        {/* <td>{o.orders.deliveryDate}</td> */}
                                        
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
              
            </div>
            <Footer/>
        </div>
    );
}

export default Orders;