import React, { useState, useEffect } from "react";

const FetchUserName = ({ userId }) => {
  const [email, setEmail] = useState("");
  console.log(userId);
  fetch(`${process.env.REACT_APP_API_BASE_URL}/users/username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      userId: userId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setEmail(data.user.email);
      //   console.log(data.user.email);
    });

  return <td className="p-3">{email}</td>;
};

export default FetchUserName;
