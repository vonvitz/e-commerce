import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroImage from "../../images/1.png";
import HeroImage2 from "../../images/2.png";
import HeroImage3 from "../../images/3.jpg";
import HeroImage4 from "../../images/4.jpg";
import HeroImage5 from "../../images/5.jpg";
import HeroImage6 from "../../images/6.jpg";

const HomePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Carousel interval={3000} pause={false} indicators={true}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={HeroImage4}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={HeroImage6}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={HeroImage3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col className="p-5 text-center">
          <h1>Mabuhay Philippines</h1>
          <h5>Pindutin ang 'Produkto' para makita ang listahan</h5>

          <Link className="btn btn-primary" to="/products">
            Produkto
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
