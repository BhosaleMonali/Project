import { useEffect, useState } from 'react';
import adminServices from '../../Services/admin.services';
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';


function AddProduct() {
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [pricepercake, setPricePerCake] = useState('');
    const [imagepath, setImage] = useState('');

    const navigate = useNavigate();
    // let formdata = new FormData();
    // const onFileChange = (e) => {
    //     console.log(e.target.files[0])
    //     if (e.target && e.target.files[0]) {
    //         formdata.append('imgFile', e.target.files[0])
    //     }
    // }

   

    

    var id;
    const addProduct = (e) => {
        e.preventDefault();
        const product = { title, quantity, pricepercake }
        console.log(product)
        // console.log('Another Component Value: ', props.id)
        const image={imagepath}
        console.log(image)


        adminServices.addProduct(product, image)
            .then(response => {
                console.log('Product added', response.data)
                toast.success('Product Added. Auto-Redirecting....',
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                )
                setTimeout(() => {
                    console.log("User Registered")
                    navigate('/admin/productslist')
                }, 2500)
               
            })
            .catch(error => {
                console.log('Something went wrong', error)
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
            <AdminNavBar />
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xl-8 col-md-8 col-12 col-sm-12">

                        <div className="card shadow-lg my-5">
                            <div className="card-body px-5 pt-5">
                                <h1 className="fs-4 card-title fw-bold mb-4 text-center">Add New Product</h1>
                                <form onSubmit={(e) => addProduct(e)}>

                                    <div className="row g-3">
                                        <div className="col-xl-6 col-md-6 col-sm-12 col-12 mb-3">
                                            <label className="mb-2 text-muted" htmlFor="stockItem">Product Name</label>
                                            <input id="stockItem" type="text" className="form-control" name="stockItem" required autoFocus
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />

                                        </div>

                                        <div className="col-xl-6 col-md-6 col-sm-12 col-12 mb-3">
                                            <label className="mb-2 text-muted" htmlFor="quantity">Quantity</label>
                                            <input id="quantity" type="number" className="form-control" name="quantity" required
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-xl-6 col-md-6 col-sm-12 col-12 mb-3">
                                            <label className="mb-2 text-muted" htmlFor="pricePerUnit">Price Per Unit</label>
                                            <input id="pricePerUnit" type="number" className="form-control" name="pricePerUnit" required
                                                value={pricepercake}
                                                onChange={(e) => setPricePerCake(e.target.value)}
                                            />
                                        </div>
                                        {/* new div added for the image path iwanted to share */}
                                        
                                    </div>
                                    <div className="modal-body">

                                        
                                                <div className="mb-3">
                                                    <label className="mb-2 text-muted" htmlFor="image">Image</label>
                                                    <input className="form-control" type="file" id="formFile"
                                                    onChange={(e) => setImage(e.target.files[0])} />
                                                </div>
                                                
                                        </div>
                                            

                                        
                                    <div className="row align-items-center d-flex my-3">
                                        <div className="col-xl-4"></div>
                                        <div className="col-xl-4">
                                            <button type="submit" className="btn btn-primary form-control">
                                                Add New Product
                                            </button>
                                        </div>
                                        <div className="col-xl-4"></div>


                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AddProduct;