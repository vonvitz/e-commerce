import React from 'react';
// import AppNavBar from "./components/navbar/AppNavBar";
// import Banner from "./components/banner/Banner";
import { useState, useEffect } from 'react';
import { AppNavBar } from './components';
import { LoginPage, RegisterPage, HomePage, Logout, Error } from './pages';
import { AddProduct, DashboardPage, ViewOrderList } from './admin';
import { ProductPage, ProfilePage, ProductDetails, CartView } from './users';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';

// import "./App.css";

const Main = () => {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    firstName: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };
  const url = 'http://localhost:4005/b5/users/details';
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user !== 'undefined') {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
            firstName: data.user.firstName,
          });
        } else {
          setUser({
            id: null,
          });
        }
      });
  }, []);

  return (
    <>
      {/* <Banner /> */}
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}

      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavBar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            {/* ADMIN ROUTE */}
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/orderslist" element={<ViewOrderList />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="*" element={<Error />} />

            <Route path="/productdetails/:pid" element={<ProductDetails />} exact="true" />
            {/* End of Admin Route */}
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
};

export default Main;
