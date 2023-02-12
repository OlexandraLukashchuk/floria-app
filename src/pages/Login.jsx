import { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth } from "../firebase.config"
import { async } from "@firebase/util";
import { toast } from "react-toastify";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const signIn = async (e)=>{
    e.preventDefault()
    setLoading(true)

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user =  userCredential.user

      console.log(user)
      setLoading(false)
      toast.success('You are logged in')
      navigate('/checkout')
    }catch(error){
      setLoading(false)
      toast.error(error.message)
    }
  }


  return <Helmet title="Login">
    <section>
      <Container>
        <Row>
          <Col lg='6' className="m-auto text-center">
            <h3 className="fw-bold mb-5">Login</h3>
            <Form className="auth_form" onSubmit={signIn}>
              <FormGroup className="form_group">
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form_group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <button type="submit" className="buy_btn auth_btn">Login</button>
              <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
};

export default Login;
