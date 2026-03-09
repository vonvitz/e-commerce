import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ArchiveProduct = ({ product, isActive }) => {
  //archive
  const archiveToggle = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Product archived successfully") {
          Swal.fire({
            title: "Product archived successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please try again",
          });
        }
      });
  };
  //activate
  const activateToggle = (productId) => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // data.message can also be used as condition
        if (data.message === "Product activated successfully") {
          Swal.fire({
            title: "Product activated",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please try again",
          });
        }
      });
  };

  return (
    <div>
      <>
        {isActive ? (
          <Button
            variant="danger"
            size="sm"
            onClick={() => archiveToggle(product)}
          >
            Archive
          </Button>
        ) : (
          <Button
            variant="success"
            size="sm"
            onClick={() => activateToggle(product)}
          >
            Activate
          </Button>
        )}
      </>
    </div>
  );
};

export default ArchiveProduct;
