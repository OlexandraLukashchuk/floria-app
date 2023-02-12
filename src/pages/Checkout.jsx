import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommoSection'
import '../styles/checkout.css'

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from '../firebase.config'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
 

  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [adres, setAdres] =useState("")


  const navigate = useNavigate();

  
 

  const orderpage = () => {
    const orderConfig = {
      user,
      email,
      
      orderAmount: totalAmount,
      quantity: totalQty,
      adres,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
     
      toast.success("Order saved");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };




  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  return <Helmet title='Checkout'>
    <CommonSection title ="Checkout"/>
    <section>
      <Container>
        <Row>
          <Col lg='8'>
          <h6 className='mb-4 fw-bold '>Billing information</h6>
          <Form className='billing_form' onSubmit={orderpage}>
            <FormGroup className="form_group">
              <input type='text' value={user} placeholder='Enter your name' 
              onChange={(e) => setUser(e.target.value)}/>
            </FormGroup>
            <FormGroup className="form_group">
              <input type='email' value={email} placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}/>
            </FormGroup>
            <FormGroup className="form_group">
              <input type='text' value={adres} placeholder='Street address'
              onChange={(e) => setAdres(e.target.value)}/>
            </FormGroup>
            
          </Form>
          </Col>
          <Col lg='4'>
            <div className='checkout_cart'>
              <h6>Total Quantity: <span>{totalQty} items</span></h6>
              <h6>Total Cost: <span>${totalAmount}</span></h6>
            </div>
            <button className='buy_btn auth_btn w-45'onClick={orderpage}>Deliver</button>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout