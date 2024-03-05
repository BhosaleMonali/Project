import { useEffect, useState } from 'react';
import adminServices from '../../Services/admin.services';
import { useNavigate} from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import Footer from '../Footer';

function UsersList() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const init = () => {
        adminServices.getUsersList()
            .then(response => {
                console.log('Printing users data', response.data);
                setUsers(response.data);
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
        adminServices.removeuser(id)
            .then(response => {
                console.log('employee deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <AdminNavBar />
            <div className="container">
                <h3 class="my-1 mt-5 text-center text-primary fw-bold">List of Users</h3>
                <hr />
                <div>
                    <button type="button" className="btn btn-info mb-3 " onClick={() => { navigate("/admin") }}> <i class="fa fa-home" aria-hidden="true"></i> Go To Back Page</button>
                    <button type="button" className="btn btn-primary mb-3 float-end" onClick={() => navigate('/register')}> <i class="fa fa-plus-circle" aria-hidden="true"></i> Add New User</button>
                    
                    <table className="table table-bordered table-striped text-center">
                        <thead className="thead-dark">
                        <tr className="table-primary">
                                <th>User Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile No.</th>
                                <th>Email</th>
                                <th>City</th>
                                <th className='text-center'>Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(f => (
                                    <tr key={f.userId}>
                                        {/* <td>{farmers.indexOf(f) + 1}</td> */}
                                        <td>{f.userId}</td>
                                        <td>{f.fname}</td>
                                        <td>{f.lname}</td>
                                        <td>{f.mobileNo}</td>
                                        <td>{f.email}</td>
                                        <td>{f.city}</td>
                                        <td className='text-center'>
                                            {/* <button type="button" className="btn btn-info mx-1" onClick={() =>
                                                navigate(`/admin/updatefarmer/${f.farmerId}`)}>Update</button> */}

                                            {/* <button type="button" className="btn btn btn-success mx-3" onClick={() =>
                                                navigate(`/admin/addproduct/`)}>Add Product</button> */}

                                            <button className="btn btn-danger ml-2" onClick={() => {
                                                handleDelete(f.userId);
                                            }}>Delete</button>
                                        </td>
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

export default UsersList;