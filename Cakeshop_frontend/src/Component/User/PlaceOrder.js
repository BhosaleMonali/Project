import { useState } from "react";
import userServices from '../../Services/user.services';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import UserNavBar from './UserNavBar';

function PlaceOrder() {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const [product_id, setProdcutId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('')
    const [message,setMessage]= useState('')
    const[orderStatus,setOrderStatus]= useState('')
    const[user_id,setUserId]= useState('')
    const navigate = useNavigate();

    const placeorder = (e) => {
        e.preventDefault();
        
        const address={city,state,pincode,mobileno}
        setOrderStatus("pending");
        const cart={product_id,quantity,weight,message,orderStatus}

        
        const user = { address,cart,user_id }
        console.log(user)

        userServices.placeorders(user)
            .then(respose => {
                console.log("waiting", respose.data)
                toast.success('order is in pending wait for the confired status',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    console.log("placeorder")
                    navigate('/user')
                }, 2500)
            })
            .catch(error => {
                console.log('Something Went Wrong', error);
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

    return (
        <div>
          <UserNavBar/>
            <div className="container h-100">
                <div className="row">
                    <div className="col-xl-2"></div>
                    <div className="col-xl-8">
                        
                        <div className="card shadow-lg border border-primary">
                            <div className="card-body px-5 pt-5">
                                <h1 className="fs-4 card-title fw-bold mb-1 text-center text-primary">CheckOut</h1><hr />
                                <form onSubmit={(e) => placeorder(e)}>

                                    <div className="row g-3 mt-0">
                                        <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="firstname">First Name</label> */}
                                            <input id="city" type="text" className="form-control" name="city" required autoFocus
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder=" city"
                                            />
                                        </div>

                                        <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="lastname">Last Name</label> */}
                                            <input id="state" type="text" className="form-control" name="state" required
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                placeholder="state"
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-0">
                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="email">E-Mail Address</label> */}
                                            <input id="pincode" type="text" className="form-control" name="pincode" required
                                                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                placeholder=" pincode"
                                            />
                                        </div>

                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="password">Password</label> */}
                                            <input id="MobileNo" type="text" className="form-control" name="mobileno" required
                                                value={mobileno}
                                                onChange={(e) => setMobileNo(e.target.value)}
                                                placeholder="MobileNo"
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-0">
                                        
                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="Address">Address</label> */}
                                            <input id="product_id" type="test" className="form-control" name="id" required
                                                value={product_id}
                                                onChange={(e) => setProdcutId(e.target.value)}
                                                placeholder="product_id"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-0">
                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-2">
                                            {/* <label className="mb-2 text-muted" htmlFor="phone">Phone No.</label> */}
                                            <input id="quantity" type="tel" className="form-control" name="quantity" required
                                                // pattern="[0-9]{10}"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                placeholder="quantity"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="Address">Address</label> */}
                                            <input id="weight" type="test" className="form-control" name="weight" required
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                placeholder="weight"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-3 mt-0">
                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-2">
                                            {/* <label className="mb-2 text-muted" htmlFor="phone">Phone No.</label> */}
                                            <input id="message" type="tel" className="form-control" name="message" required
                                                // pattern="[0-9]{10}"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="message"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                                            {/* <label className="mb-2 text-muted" htmlFor="Address">Address</label> */}
                                            <input id="user_id" type="test" className="form-control" name="user_id" required
                                                value={user_id}
                                                onChange={(e) => setUserId(e.target.value)}
                                                placeholder="user_id"
                                            />
                                        </div>
                                    </div>
                                    

                                    <div className="align-items-center d-flex">
                                        <button type="submit" className="btn btn-primary form-control">
                                            PlaceOrder
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-xl-2"></div>





                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default PlaceOrder;