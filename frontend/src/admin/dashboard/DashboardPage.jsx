import React, { useEffect, useState, useContext } from "react";
import { Table, Container } from "react-bootstrap";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import UpdateProduct from "../updateProduct/UpdateProduct";
import ArchiveProduct from "../archiveproduct/ArchiveProduct";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // if (user !== null && user.isAdmin === true) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
    // }
  });

  // return user.id === null ? (
  //   <Navigate to="/login" />
  // ) : (
  return user.isAdmin ? (
    <Container>
      <h1 className="display-1 text-center mt-5">Admin Dashboard</h1>
      <Table responsive striped bordered className="mt-5">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{parseFloat(product.price).toFixed(2)}</td>
              <td>{product.isActive ? "Available" : "Unavailable"}</td>
              <td>
                <UpdateProduct product={product._id} />
              </td>
              <td>
                <ArchiveProduct
                  product={product._id}
                  isActive={product.isActive}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : (
    <Navigate to="/products" />
  );

  // );
};

export default DashboardPage;
