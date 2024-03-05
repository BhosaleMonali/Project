import { useEffect, useState } from 'react';
import adminServices from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import { useNavigate } from "react-router-dom";
import Footer from '../Footer';
import toast from 'react-hot-toast';

function OrderDetails() {

    const navigate = useNavigate()
    const [order, setOrder] = useState([])
    const [id, setId] = useState('')
    const [status, setOrderStatus] = useState('')

    const init = () => {
        adminServices.orderDetail()
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
    const updateData = () => {
        const formdata = new FormData();
        if (id === "" || status === "") {
            console.log("Empty")
            toast.error('Something went wrong!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            return;
        }
        console.log(id);
        console.log(status);

        formdata.append('id', id)
        formdata.append('status', status)
        console.log(formdata)
        const update = { id, status }
        console.log(update)
        adminServices.updateProduct(update)
            .then(response => {
                console.log("Updated", response)
                toast.success('Product Updated. Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    window.location.reload();
                }, 2500)

            })
            .catch(error => {
                // console.log("Something went wrong", error)
                console.error("Error updating product:", error.response ? error.response.data : error.message);
                toast.error('Something went wrong!',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
            })
    }
    const updateModalData = (id, status) => {
        setId(id)
        setOrderStatus(status)

    }

    return (
        <div>
            <AdminNavBar />
            <div className="container-fluid">
                <h3 class="my-1 mt-5 text-center text-primary fw-bold">List of Order Details</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-info mb-3" onClick={() => { navigate("/admin") }}> <i class="fa fa-home" aria-hidden="true"></i>  Go To Back Page</button>
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr className="table-primary">
                                <th>Order Id</th>
                                <th>Product Name</th>
                                <th>Customer Name</th>
                                <th>Mobile No.</th>
                                <th>Address</th>
                                <th>Zipcode</th>
                                <th>Quantity</th>
                                <th>Weigth(Kg)</th>
                                <th>Message On Cake</th>
                                <th>Amount</th>
                                <th>Order Status</th>
                                {/* <th>Delivery Date</th> */}
                                <th className='text-center'>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.map(o => (
                                    <tr key={o.id}>
                                        <td>{o.id}</td>
                                        <td>{o.product.title}</td>
                                        <td>{o.order.user.fname + " " + o.order.user.lname}</td>
                                        <td>{o.order.user.mobileNo}</td>
                                        <td>{o.order.address.city}</td>
                                        <td>{o.order.address.pincode}</td>
                                        <td>{o.quantity}</td>
                                        <td>{o.weight}</td>
                                        <td>{o.message}</td>
                                        <td>{o.amount}</td>
                                        <td>{o.orderStatus}</td>
                                        {/* <td>{o.orders.deliveryDate}</td> */}
                                        <td className='text-center'>


                                            {/* Modal Trigger for product update */}
                                            <button type="button" className="btn btn-info mx-1" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1"
                                                onClick={() => updateModalData(o.id, o.orderStatus)}>Update
                                            </button>

                                            {/* Modal Component for orderstatus update */}
                                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Status</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            
                                                            <div className="row mb-3">
                                                                <div className="col">
                                                                    <label class="mb-2 text-muted" for="category">OrderId</label>
                                                                    <input type="text" className="form-control" placeholder="enter the orderId" aria-label="New Product Name"
                                                                        value={id}
                                                                        onChange={(e) => setId(e.target.value)}
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="row mb-3">
                                                                <div className="col">
                                                                    <label class="mb-2 text-muted" for="category">OrderStatus</label>
                                                
                                                                    <select className="form-select" value={status} onChange={(e) => setOrderStatus(e.target.value)}>
                                                                        <option value="">Select Status</option>
                                                                        <option value="Accepted">Accepted</option>
                                                                        <option value="Canceled">Canceled</option>
                                                                    </select>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={updateData}>Save Data</button>

                                                            {/* <button type="button" className="btn btn-primary" >Save Data</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default OrderDetails;