import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputGroup,
  Form,
  FormGroup,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

import UserContext from "../../UserContext";

const ProductDetails = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const { pid } = useParams();
  //set values
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.product.name);
        setDesc(data.product.description);
        setPrice(data.product.price);
      });
  }, []);
  //const AddToCart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) > 0) {
      setQuantity(Number(value));
    }
  };
  //add to cart
  const addtocart = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: pid,
        quantity: quantity,
        subtotal: quantity * price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const itemIndex = data.cart.cartItems.findIndex(
          (item) => item.productId === pid
        );

        Swal.fire({
          title: "Add to cart is successful",
          text:
            "Total items in Cart : " + data.cart.cartItems[itemIndex].quantity,
          icon: "success",
          showConfirmButton: true,
        }).then(() => {
          navigate("/cart");
        });
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="display-1 text-center mt-5">Add To Cart</h1>
        <Col xs="auto" className="mt-5">
          <Form onSubmit={(e) => addtocart(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <h5>{name}</h5>
              </Form.Label>
              <br />
              <Form.Label>{desc}</Form.Label>
              <br />
              <Form.Label>Php: {price}</Form.Label>
            </Form.Group>
            <FormGroup>
              <InputGroup
                className="mb-3 mx-auto"
                style={{ maxWidth: "150px" }}
              >
                <Button
                  variant="outline-secondary btn-dark"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <FormControl
                  type="number"
                  value={quantity}
                  onChange={handleChange}
                  min="1"
                />
                <Button
                  variant="outline-secondary btn-dark"
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                Add to Cart
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
