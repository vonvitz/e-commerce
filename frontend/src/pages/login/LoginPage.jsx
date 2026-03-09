import React from 'react';
import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap';
import UserContext from '../../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);

  //login
  function login(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(email);
        // console.log(password);
        if (data.access) {
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);
          // console.table(data);
          Swal.fire({
            title: 'Login Successful',
            icon: 'success',
            text: `Welcome ${data.user.firstName}`,
            timer: 1000, // to display the alert with 2 sec
            showConfirmButton: true,
          }).then(() => {
            setTimeout(() => {
              // window.location.reload();
            }); // Delay of 2 second
          }, 1000);
        } else {
          Swal.fire({
            title: 'Authentication failed',
            icon: 'error',
            text: 'Check your login details and try again.',
          });
        }
      });

    setEmail('');
    setPassword('');
  }
  //retrieve data
  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
        // window.location.reload();
      });
  };
  // return;

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  // First Code ==========================================
  // return (user.id !== null ? (
  //   <>
  //   {
  //     user.isAdmin === true ?
  //     (<Navigate to="/dashboard">):
  //      (<Navigate to="/products" />)
  //   }
  //   </>
  // ) : (
  //   <Container>
  //     <h1 className="display-1 text-center mt-5 mb-5">Login Page</h1>
  //     <Row>
  //       <Col className="justify-content-center align-items-center ">
  //         {/* <h1 className="">Login Page</h1> */}
  //         <Card>
  //           {/* <Card.Header>Login Page</Card.Header> */}
  //           <Card.Body>
  //             <Form onSubmit={(e) => login(e)}>
  //               <Form.Group className="mb-3" controlId="formBasicEmail">
  //                 <Form.Label>Email address</Form.Label>
  //                 <Form.Control
  //                   type="email"
  //                   placeholder="Enter email"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                   required
  //                 />
  //                 <Form.Text className="text-muted">
  //                   We'll never share your email with anyone else.
  //                 </Form.Text>
  //               </Form.Group>

  //               <Form.Group className="mb-3" controlId="formBasicPassword">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control
  //                   type="password"
  //                   placeholder="Password"
  //                   value={password}
  //                   onChange={(e) => setPassword(e.target.value)}
  //                   required
  //                 />
  //               </Form.Group>

  //               <Button variant="primary" type="submit">
  //                 Submit
  //               </Button>
  //             </Form>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </Container>
  // )
  // First Code ==========================================

  return user.id !== null ? (
    <>{user.isAdmin ? <Navigate to="/dashboard" /> : <Navigate to="/products" />}</>
  ) : (
    <Container>
      <h1 className="display-1 text-center mt-5 mb-5">Login</h1>
      <Row>
        <Col className="justify-content-center align-items-center">
          {/* <h1 className="">Login Page</h1> */}
          <Card>
            {/* <Card.Header>Login Page</Card.Header> */}
            <Card.Body>
              <Form onSubmit={(e) => login(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  // return (
  //   <Container>
  //     <h1 className="display-1 text-center mt-5 mb-5">Login Page</h1>
  //     <Row>
  //       <Col className="justify-content-center align-items-center">
  //         {/* <h1 className="">Login Page</h1> */}
  //         <Card>
  //           {/* <Card.Header>Login Page</Card.Header> */}
  //           <Card.Body>
  //             <Form onSubmit={(e) => login(e)}>
  //               <Form.Group className="mb-3" controlId="formBasicEmail">
  //                 <Form.Label>Email address</Form.Label>
  //                 <Form.Control
  //                   type="email"
  //                   placeholder="Enter email"
  //                   value={email}
  //                   onChange={(e) => setEmail(e.target.value)}
  //                   required
  //                 />
  //                 <Form.Text className="text-muted">
  //                   We'll never share your email with anyone else.
  //                 </Form.Text>
  //               </Form.Group>

  //               <Form.Group className="mb-3" controlId="formBasicPassword">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control
  //                   type="password"
  //                   placeholder="Password"
  //                   value={password}
  //                   onChange={(e) => setPassword(e.target.value)}
  //                   required
  //                 />
  //               </Form.Group>

  //               <Button variant="primary" type="submit">
  //                 Submit
  //               </Button>
  //             </Form>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </Container>
  // );
};

export default LoginPage;
