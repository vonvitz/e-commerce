import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  //check fields

  useEffect(() => {
    if (name === "" || desc === "" || price <= 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, desc, price]);

  console.log(name);
  console.log(desc);
  console.log(price);
  //create function
  const create = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        description: desc,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.product) {
          Swal.fire({
            title: "New product added",
            icon: "success",
            text: `${name}: Php ${parseFloat(price).toFixed(2)}`,
            showConfirmButton: true,
          });
          //reset all fields
          setName("");
          setPrice(0);
          setDesc("");
        } else if ((data.error = "Product already exists")) {
          Swal.fire({
            title: "Product exist",
            icon: "warning",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            title: "An error occured",
            icon: "error",
            text: "Please try again",
            showConfirmButton: true,
          });
        }
      });
  };

  return (
    <>
      <Container>
        <h1 className="display-1 mt-5 text-center">Add Product</h1>
        <Row className="justify-content-center align-items-center m-5 p-5">
          <Col xs={5}>
            <Form onSubmit={(e) => create(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type the product name here"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type the description"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  min="0"
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isDisabled}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;
