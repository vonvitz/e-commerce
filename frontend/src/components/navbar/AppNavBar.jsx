import React from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../UserContext';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const AppNavBar = () => {
  const { user } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">E-commerce | Von Larong</Navbar.Brand>
        <Nav className="justify-content-end">
          {user.id !== null ? (
            <>
              {user.isAdmin ? (
                <>
                  <Nav.Link as={Link} to="/addProduct">
                    Add Product
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">
                    DashBoard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/orderslist">
                    Orders
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/" exact="true">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/products">
                    Products
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />{' '}
                  </Nav.Link>
                </>
              )}
              <Nav className="ml-auto">
                <Nav.Link onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                  {user.firstName} <FontAwesomeIcon icon={faCaretDown} />
                </Nav.Link>
                <Dropdown show={dropdownOpen} onMouseLeave={closeDropdown} align="end">
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/profilepage">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={NavLink} to="/logout">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
