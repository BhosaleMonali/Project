import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserNavBar from "./UserNavBar";
import Footer from "../Footer";
import AdminServices from "../../Services/admin.services";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function User() {
    const [products, setProducts] = useState([])
    const [isReRender, setIsReRender] = useState(true)

    const init = () => {
        AdminServices.getProductList()
            .then(response => {
                console.log('Printing Products data', response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <UserNavBar />

            <div style={{ flex: 1, backgroundImage: `url('https://as2.ftcdn.net/v2/jpg/06/41/49/43/1000_F_641494300_PjyoBPt2ksFswXCLSMqFRCXDz2Ch79DV.jpg')`, backgroundSize: 'cover', position: 'relative' }}>
                <div className="container mt-2">
                    {isReRender ? <Row xs={1} sm={2} md={5} className="g-4">
                        {products.map((p) => (
                            <Col key={p.id}>
                                <Card>
                                    <Card.Img variant="top" src={`C:\\Users\\shree\\Desktop\\project\\Frontend\\my-app\\src\\productimage\\${p.imagepath}`} />
                                    <Card.Body className="text-center">
                                        <Card.Title>{p.title}</Card.Title>
                                        <Card.Text>
                                            Amount: INR <div className="fw-bold">{p.pricepercake}</div>
                                        </Card.Text>
                                        <Link to={`/user/placeorder/${p.id}`}>
                                            <Button variant="primary">Add To Cart</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    :
                    " "
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;
