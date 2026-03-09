import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../UserContext";
// import { useParams } from "react-router-dom";
import RemoveFromCart from "../removefromcart/RemoveFromCart";
import ClearCart from "../clearcart/ClearCart";
import Checkout from "../checkout/Checkout";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Card,
  Button,
  Container,
  Table,
  FormControl,
  InputGroup,
  Form,
  FormGroup,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CartView = () => {
  const { user } = useContext(UserContext);
  // const { pid } = useParams();
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState(0);
  // const [quantity, setQuantity] = useState(0);
  // const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //first render
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error == "Cart not found") {
          setLoading(false);
        } else {
          setCartItems(data.cart.cartItems);
          setTotal(data.cart.totalPrice);
          setLoading(false);
        }
      });
  }, []);
  // useEffect(() => {
  //   if (!user.isAdmin) {
  //     fetch(
  //       `http://ec2-3-145-114-4.us-east-2.compute.amazonaws.com/b5/cart/get-cart`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         // if (data.error === "Cart not found") {
  //         //   setLoading(false);
  //         // } else {
  //         //   setCartItems(data.cart.cartItems || []);
  //         //   setTotal(data.cart.totalPrice);
  //         //   setLoading(false);
  //         // }
  //       });
  //   } else {
  //     setLoading(false);
  //   }
  // }, [user.isAdmin]);

  const reload = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error == "Cart not found") {
          setCartItems([]);
          setTotal(0);
          setLoading(false);
        } else {
          setCartItems(data.cart.cartItems);
          setTotal(data.cart.totalPrice);
          setLoading(false);
        }
      });
  };

  const fetchProductDetails = (productId) => {
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        return {
          name: data.product.name,
          price: data.product.price,
        };
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        return { name: "", price: 0 }; // Return default values or handle error gracefully
      });
  };

  useEffect(() => {
    const fetchProductDetailsForCart = async () => {
      const promises = cartItems.map((item) =>
        fetchProductDetails(item.productId)
      );
      const resolvedProductDetails = await Promise.all(promises);
      setProductDetails(resolvedProductDetails);
    };

    if (cartItems.length > 0) {
      fetchProductDetailsForCart();
    }
  }, [cartItems]);

  const handleQuantityChange = (index, change) => {
    const updatedItems = [...cartItems];
    const newQuantity = updatedItems[index].quantity + change;
    if (newQuantity < 1) return; // Ensure quantity doesn't go below 1
    updatedItems[index].quantity = newQuantity;
    updatedItems[index].subtotal =
      newQuantity * (productDetails[index] ? productDetails[index].price : 0);
    setCartItems(updatedItems);
    setTotal(updatedItems.reduce((acc, item) => acc + item.subtotal, 0)); // Update total

    //update quantity
    updateQuantity(
      newQuantity,
      updatedItems[index].productId,
      productDetails[index].price
    );
  };

  //update  quantity in database
  const updateQuantity = (quantity, productId, price) => {
    console.log(quantity);
    console.log(productId);
    console.log(price);
    //update price
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        subtotal: quantity * price,
      }),
    });
  };

  //   return (
  //     <>
  //       {user.isAdmin === true ? (<Navigate to="/dashboard" />) : ({" "}
  //       {loading ? (
  //         <div className="d-flex justify-content-center align-items-center vh-100">
  //           <Spinner
  //             animation="border"
  //             role="status"
  //             style={{ width: "5rem", height: "5rem" }}
  //             variant="danger"
  //           >
  //             <span className="visually-hidden">Loading...</span>
  //           </Spinner>
  //         </div>
  //       ) : (
  //         <>
  //           <h1 className="display-1 mt-5 text-center">Cart</h1>
  //           <h2 className="display-5 mt-5 text-center">Your Shopping Cart</h2>
  //           <Container className="mt-5">
  //             <Card>
  //               <Card.Body>
  //                 <Table striped bordered hover>
  //                   <thead className="text-center">
  //                     <tr>
  //                       <th>Name</th>
  //                       <th>Price</th>
  //                       <th>Quantity</th>
  //                       <th>Subtotal</th>
  //                       <th>Action</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {cartItems.map((item, index) => (
  //                       <tr key={index}>
  //                         <td>
  //                           {productDetails[index]
  //                             ? productDetails[index].name
  //                             : ""}
  //                         </td>
  //                         <td>
  //                           {productDetails[index]
  //                             ? productDetails[index].price
  //                             : 0}
  //                         </td>
  //                         <td>
  //                           <Form>
  //                             <FormGroup>
  //                               <InputGroup
  //                                 className="mb-3 mx-auto"
  //                                 style={{ maxWidth: "150px" }}
  //                               >
  //                                 <Button
  //                                   variant="outline-secondary btn-dark"
  //                                   onClick={() =>
  //                                     handleQuantityChange(index, -1)
  //                                   }
  //                                 >
  //                                   -
  //                                 </Button>
  //                                 <FormControl
  //                                   type="number"
  //                                   min="1"
  //                                   value={item.quantity}
  //                                   readOnly
  //                                 />
  //                                 <Button
  //                                   variant="outline-secondary btn-dark"
  //                                   onClick={() => handleQuantityChange(index, 1)}
  //                                 >
  //                                   +
  //                                 </Button>
  //                               </InputGroup>
  //                             </FormGroup>
  //                           </Form>
  //                         </td>
  //                         <td>
  //                           {item.quantity *
  //                             (productDetails[index]
  //                               ? productDetails[index].price
  //                               : 0)}
  //                         </td>
  //                         <td>
  //                           <RemoveFromCart
  //                             product={item.productId}
  //                             reload={reload}
  //                           />
  //                         </td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </Table>

  //                 <Row>
  //                   <Row>
  //                     <Col>
  //                       {/* <Button variant="warning">Clear Cart</Button> */}
  //                       <ClearCart reload={reload} />
  //                     </Col>
  //                     <Col className=" d-flex justify-content-end align-items-center">
  //                       <Checkout reload={reload} />
  //                     </Col>
  //                   </Row>

  //                   <Col>
  //                     <h1 className="text-center">Total: ${total.toFixed(2)}</h1>
  //                   </Col>
  //                 </Row>
  //               </Card.Body>
  //             </Card>
  //           </Container>
  //         </>
  //       )}
  // )
  //     </>
  //   );

  return (
    <>
      {user.isAdmin === true ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "5rem", height: "5rem" }}
                variant="danger"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <h1 className="display-1 mt-5 text-center">Cart</h1>
              <h2 className="display-5 mt-5 text-center">Your Shopping Cart</h2>
              <Container className="mt-5">
                <Card>
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead className="text-center">
                        <tr>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center pt-3">
                              {productDetails[index]
                                ? productDetails[index].name
                                : ""}
                            </td>
                            <td className="text-center pt-3">
                              {productDetails[index]
                                ? productDetails[index].price
                                : 0}
                            </td>
                            <td className="text-center pt-3">
                              <Form>
                                <FormGroup>
                                  <InputGroup
                                    className="mb-3 mx-auto"
                                    style={{ maxWidth: "150px" }}
                                  >
                                    <Button
                                      variant="outline-secondary btn-dark"
                                      onClick={() =>
                                        handleQuantityChange(index, -1)
                                      }
                                    >
                                      -
                                    </Button>
                                    <FormControl
                                      type="number"
                                      min="1"
                                      value={item.quantity}
                                      readOnly
                                      style={{ textAlign: "center" }}
                                    />
                                    <Button
                                      variant="outline-secondary btn-dark"
                                      onClick={() =>
                                        handleQuantityChange(index, 1)
                                      }
                                    >
                                      +
                                    </Button>
                                  </InputGroup>
                                </FormGroup>
                              </Form>
                            </td>
                            <td className="text-center pt-3">
                              {item.quantity *
                                (productDetails[index]
                                  ? productDetails[index].price
                                  : 0)}
                            </td>
                            <td className="text-center pt-3">
                              <RemoveFromCart
                                product={item.productId}
                                reload={reload}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Row>
                      <Row>
                        <Col>
                          {/* <Button variant="warning">Clear Cart</Button> */}
                          <ClearCart reload={reload} />
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                          <Checkout reload={reload} />
                        </Col>
                      </Row>
                      <Col>
                        <h1 className="text-center">
                          Total: ${total.toFixed(2)}
                        </h1>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col className="text-center">
                        <Button
                          variant="primary"
                          onClick={() => navigate("/products")}
                        >
                          Back to Products
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CartView;
