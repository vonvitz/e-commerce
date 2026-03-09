import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const RemoveFromCart = ({ product, reload }) => {
  const remove = (productId) => {
    console.log(productId);
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`,
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
        if (data.message === "Item removed from cart successfully") {
          Swal.fire({
            title: "Item removed",
            icon: "success",
          });
          //reload
          reload();
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
    <Button variant="danger" size="sm" onClick={() => remove(product)}>
      Remove
    </Button>
  );
};

export default RemoveFromCart;
