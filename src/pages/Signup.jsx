import { useState,  useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import "../styles/login.css"

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from "../firebase.config";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { db } from '../firebase.config'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ loading, setLoading] = useState(false);
  
  const [file, setFile] = useState(null)
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
            
    }, [password])

  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();

    setLoading(true);


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = await userCredential.user
      const storageRef = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL
          });
        });
      })

      setLoading(false)
      toast.success('Account created')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong")
    }
  }


  return <Helmet title="Signup">
    <section>
      <Container>
        <Row>
          <Col lg='6' className="m-auto text-center">
            <h3 className="fw-bold mb-5">Signup</h3>

            <Form className="auth_form" onSubmit={signup}>
              <FormGroup className="form_group">
                <input
                  type="text"
                  placeholder="User name"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
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
                  aria-invalid={validPwd ? "false" : "true"}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)} 
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                  />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}></p>
                
                
              </FormGroup>
              
              <FormGroup className="form_group">
                <input
                  type="file"

                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FormGroup >

              <button type="submit" className="buy_btn auth_btn">Signup</button>
              <p>Already have an account? <Link to='/login'>Login</Link></p>

            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
};

export default Signup;
