import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../../UserContext";

const ProductPage = () => {
  const { user } = useContext(UserContext);
  const [showProduct, setProduct] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
      });
  }, []);

  // Placeholder image URL
  const placeholderImgUrl =
    "https://via.placeholder.com/286x180.png?text=Placeholder";

  return user.isAdmin ? (
    <Navigate to="/dashboard" />
  ) : (
    <Container className="mt-5">
      <h1 className="display-1 text-center">Products</h1>
      <Row xs={1} md={2} lg={3} className="g-4 mt-5">
        {showProduct.map((product) => (
          <Col key={product._id}>
            <Card className="h-100 d-flex flex-column">
              <Card.Img
                variant="top"
                src={product.image || placeholderImgUrl}
                alt={product.name}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <div className="mt-auto">
                  <Card.Text className="mt-auto">
                    Price: Php {parseFloat(product.price).toFixed(2)}
                  </Card.Text>
                  <Link
                    className="btn btn-primary"
                    to={`/productdetails/${product._id}`}
                  >
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
};

export default ProductPage;
