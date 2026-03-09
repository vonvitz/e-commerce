import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../../UserContext';

const ProductPage = () => {
  const { user } = useContext(UserContext);
  const [showProduct, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error(err);
        setProduct([]);
        setLoading(false);
      });
  }, []);

  // Placeholder image URL
  const placeholderImgUrl = 'https://placehold.co/268x182';

  if (user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="display-1 text-center">Products</h1>

      <Row xs={1} md={2} lg={3} className="g-4 mt-5">
        {showProduct.map((product) => (
          <Col key={product._id}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img variant="top" src={product.image || placeholderImgUrl} alt={product.name} />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>

                <div className="mt-auto">
                  <Card.Text>Price: Php {parseFloat(product.price).toFixed(2)}</Card.Text>

                  <Link className="btn btn-primary" to={`/productdetails/${product._id}`}>
                    Details
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );

  // return user.isAdmin ? (
  //   <Navigate to="/dashboard" />
  // ) : (
  //   <Container className="mt-5">
  //     <h1 className="display-1 text-center">Products</h1>
  //     <Row xs={1} md={2} lg={3} className="g-4 mt-5">
  //       {showProduct.map((product) => (
  //         <Col key={product._id}>
  //           <Card className="h-100 d-flex flex-column">
  //             <Card.Img variant="top" src={product.image || placeholderImgUrl} alt={product.name} />
  //             <Card.Body className="d-flex flex-column">
  //               <Card.Title>{product.name}</Card.Title>
  //               <Card.Text>{product.description}</Card.Text>
  //               <div className="mt-auto">
  //                 <Card.Text className="mt-auto">Price: Php {parseFloat(product.price).toFixed(2)}</Card.Text>
  //                 <Link className="btn btn-primary" to={`/productdetails/${product._id}`}>
  //                   Details
  //                 </Link>
  //               </div>
  //             </Card.Body>
  //           </Card>
  //         </Col>
  //       ))}
  //     </Row>
  //   </Container>
  // );
};

export default ProductPage;
