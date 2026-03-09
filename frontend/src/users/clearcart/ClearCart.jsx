import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
const ClearCart = ({ reload }) => {
  const clear = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // data.message can also be used as condition
        if (data.message === "Cart Cleared successfully") {
          Swal.fire({
            title: "Cart cleared",
            icon: "success",
          });
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
    <Button
      variant="warning"
      size="sm"
      onClick={() => clear()}
      className="bold-text"
    >
      CLEAR CART
    </Button>
  );
};

export default ClearCart;
