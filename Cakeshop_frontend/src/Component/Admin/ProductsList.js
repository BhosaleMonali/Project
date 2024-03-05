import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
 import AddProduct from './AddProduct'
import adminServices from '../../Services/admin.services';
import AdminNavBar from './AdminNavBar';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../Footer';
// import ProductImage from '../../productimage';

function ProductsList() {
    const [products, setProducts] = useState([])
    const[id,setId] =useState('')
    const [title, setTitle] = useState('')
    const [imagePath,setImagePath] = useState('')
    const [pricepercake, setPricePerCake] = useState('')
    const [quantity, setQuantity] = useState('')



    let formdata = new FormData();
    const onFileChange = (e) => {
        console.log(e.target.files[0])
        if (e.target && e.target.files[0]) {
            formdata.append('imgFile', e.target.files[0])
        }
    }

    const handleSubmit = (id) => {

        adminServices.addProductImage(formdata, id)
            .then(response => {
                console.log('Image Uploaded', response.data)
                toast.success('Image Uploaded. Auto-Redirecting....',
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
                console.log("Something went wrong", error)
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
    const navigate = useNavigate();
    const init = () => {
        adminServices.getProductList()
            .then(response => {
                console.log('Printing Products data', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })

      
    }

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        adminServices.removeProduct(id)
            .then(response => {
                console.log('product deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const updateData = (id) => {
        if (title === "" || quantity === "" || pricepercake === "" || imagePath === "") {
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

        formdata.append('stockitem', title)
        formdata.append('priceperunit', pricepercake)
        formdata.append('quantity', quantity)
        formdata.append('ImagePath',imagePath)
    

        adminServices.updateProduct(id, formdata)
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
                console.log("Something went wrong", error)
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

    const updateModalData = (id, title, quantity, pricepercake, imagePath) => {
        setId(id)
        setTitle(title)
        setImagePath(imagePath)
        setPricePerCake(pricepercake)
        setQuantity(quantity)
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 class="my-1 mt-5 text-center text-primary fw-bold">List of Products</h3>
                <hr />
                <div>

                    <button type="button" className="btn btn-info mb-3 " onClick={() => { navigate("/admin") }}> <i class="fa fa-home" aria-hidden="true"></i> Go To Back Page</button>

                    {/* Modal Button */}
                    <a className="btn btn-primary mb-3 float-end" data-bs-toggle="modal" href="#exampleModalToggle" role="button"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New Product</a>

                    {/* 1st  Modal Component */}
                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel">Product</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                
                                <div className="modal-footer">
                                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Go To Next Step</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 2st  Modal Component */}
                    <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalToggleLabel2">Add New Product</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                     <AddProduct  /> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr className="table-primary">
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Unit</th>
                                <th>Image</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(p => (
                                    <tr key={p.id}>
                                        {/* <td>{(products.indexOf(p) + 1)}</td> */}
                                        <td>{p.id}</td>
                                        <td>{p.title}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.pricepercake}</td>

                                        <td>
                                            {/* <figure>
                                                <img src={`http://localhost:8080/FarmersMarketplace/admin/${p.id}`} alt='productImage' width={75} />
                                                <figcaption> {p.imagePath} </figcaption>
                                            </figure> */}
                                            
                                             <img src="/ ProductImage/{p.imagePath}"  className='img-fluid' alt='CakeImage'></img>
                                           
                                        </td>
                                        <td className='text-center'>


                                            {/* Modal Trigger for product update */}
                                            <button type="button" className="btn btn-info mx-1" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal1" onClick={() => updateModalData(p.id, p.title, p.quantity, p.pricePerUnit)}>Update
                                            </button>

                                            {/* Modal Component for product update */}
                                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">



                                                            <div className="row mb-3">
                                                                <div className="col">
                                                                    <label class="mb-2 text-muted" for="category">Product Name</label>
                                                                    <input type="text" className="form-control" placeholder="New product name" aria-label="New Product Name"
                                                                        value={title}
                                                                        onChange={(e) => setTitle(e.target.value)}
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <label class="mb-2 text-muted" for="category">Product Quantity</label>
                                                                    <input type="number" className="form-control" placeholder="New product quantity" aria-label="New Product Quantity"
                                                                        value={quantity}
                                                                        onChange={(e) => setQuantity(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                <label class="mb-2 text-muted" for="category">Product Price</label>
                                                                    <input type="text" className="form-control" placeholder="New Price" aria-label="New Price"
                                                                        value={pricepercake}
                                                                        onChange={(e) => setPricePerCake(e.target.value)}
                                                                    />
                                                                </div>
                                                                
                                                            </div>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => updateData(p.id)}>Save Data</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Modal Trigger for add image */}
                                            <button type="button" className="btn btn-success mx-3" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">Add Image  
                                                {/* onClick={() => setModalId(p.id)}>Add Image */}
                                            </button>

                                            {/* Modal Component  for add image */}
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Add Image</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            <form>
                                                                <div className="mb-3">
                                                                    <input className="form-control" type="file" id="formFile" onChange={onFileChange} />
                                                                </div>
                                                            </form>

                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => handleSubmit(p.id)}>Upload Image</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="btn btn-danger ml-2" onClick={() => {
                                                handleDelete(p.id);
                                            }}>Delete</button>
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

export default ProductsList;