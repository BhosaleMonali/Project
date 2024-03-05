import React, { useState, useEffect } from 'react';
import UserNavBar from './UserNavBar';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Footer from '../Footer';
import userServices from '../../Services/user.services';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const navigate = useNavigate(); // Add this line to get the navigate function

    useEffect(() => {
        // Add any initialization logic here if needed
    }, []);

    const handlePayment = async () => {
        const data = { cardNumber, expiryDate };

        userServices.payment(data)
            .then(response => {
                console.log("waiting", response.data);
                setPaymentStatus(response.data);
                toast.success('Processing....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
                setTimeout(() => {
                    console.log("payment");
                    // navigate('/user/order');
                }, 2500);
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
                );
            });
    };

    return (
        <div>
            <UserNavBar />

            <div className="container mt-5">
                <h3 className="mb-4">Payment Information</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handlePayment}
                    >
                        Process Payment
                    </button>
                </form>
                {paymentStatus && <p className="mt-3">Payment Status: {paymentStatus}</p>}
            </div>

            <Footer />
        </div>
    );
};

export default PaymentForm;
