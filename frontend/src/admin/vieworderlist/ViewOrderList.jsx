import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import FetchUserName from "../../components/fetchusername/FetchUserName";
import FetchOrderByUser from "../../components/fetchorderbyuser/FetchOrderByUser";

const OrderDate = ({ order }) => {
  const orderedOnDate = new Date(order.orderedOn);
  const formattedDate = orderedOnDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return <td className="p-3">{formattedDate}</td>;
};

const ViewOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.orders);
        // console.log(orders);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <Container>
        <h1 className="display-1 text-center mt-5">Orders List</h1>
        <Table responsive striped bordered className="mt-5">
          <thead>
            <tr className="text-center">
              <th>Order I.D.</th>
              <th>User I.D.</th>
              <th className="p-2">Products Ordered</th>
              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-3">{order._id}</td>
                <FetchUserName userId={order.userId} />
                <FetchOrderByUser orderId={order._id} />
                <td>$ {parseFloat(order.totalPrice)}</td>
                <OrderDate order={order} />
                <td>
                  {order.status === "Pending" ? (
                    <Button>Pending</Button>
                  ) : (
                    <Button>Completed</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ViewOrderList;
