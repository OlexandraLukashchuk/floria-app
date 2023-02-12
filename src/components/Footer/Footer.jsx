import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './footer.css'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/eco-logo.png"
const Footer = () => {

  const year = new Date().getFullYear()
  return <footer className="footer">
    <Container>
      <Row>
        <Col lg='12' >
          <p className='footer_copyright'>@ {year} </p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer