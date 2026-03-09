import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../UserContext";

export default function Logout() {
  const { setUser, unsetUser } = useContext(UserContext);

  // To clear the contents of the localStorage
  // localStorage.clear();

  unsetUser();

  useEffect(() => {
    setUser({
      // access : null
      id: null,
      isAdmin: null,
    });
  });

  // To redict user to Login page after sign out.
  return <Navigate to="/login" />;
}
