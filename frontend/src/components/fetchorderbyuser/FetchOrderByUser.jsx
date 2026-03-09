import React, { useEffect, useState } from "react";
import { ListGroup, Badge } from "react-bootstrap";

const ProductName = ({ productId }) => {
  const [prodname, setProdName] = useState("");
  //   console.log("prodid:", productId);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProdName(data.product.name);
      });
  }, []);
  return <>{prodname}</>;
};

const FetchOrderByUser = ({ orderId }) => {
  const [order, setOrder] = useState([]);
  //   console.log(orderId);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/getorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.order.productsOrdered);
        setOrder(data.order.productsOrdered);
      });
  }, []);
  //   console.log(order);
  return (
    <>
      <ListGroup as="ol" numbered>
        {order.map((order) => (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-center align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                <ProductName productId={order.productId} />
              </div>

              <div className="me-auto">
                Total: $ {parseFloat(order.subtotal).toFixed(2)}
              </div>
            </div>
            <Badge bg="primary" pill>
              Qty: {order.quantity}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default FetchOrderByUser;
