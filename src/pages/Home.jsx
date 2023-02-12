import React, {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import Services from '../services/Services'
import heroImg from '../assets/images/flower.jpg'
import '../styles/home.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductsList from '../components/UI/ProductsList'
import products from '../assets/data/products'

const Home = () => {

  const [trendingProducts, setTrendingProducts] =useState([])
  const [BestProducts, setBestProducts] =useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [winterProducts, setWinterProducts] = useState([])
  const year = new Date().getFullYear()

  useEffect(()=>{
    const filterdTrendingProducts = products.filter(
      (item) => item.category ==='Birthday');

      const filterdBestProducts = products.filter(
        (item) => item.category ==='Friends');

      const filterdMobileProducts = products.filter(
          (item) => item.category ==='Summer');
      
      const filterdWinterProducts = products.filter(
            (item) => item.category ==='Winter');

        
      setTrendingProducts(filterdTrendingProducts);
      setBestProducts(filterdBestProducts);
      setMobileProducts(filterdMobileProducts);
      setWinterProducts(filterdWinterProducts);
  },[]);

  return <Helmet title={"Home"}>
    <section className='hero_section'>
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero_content">
              <p className="hero_subtitle">Trending product in {year}</p>
              <h2>Your favourite boquet is here</h2>
              <p>We can deliver boquet to you with a massage</p>
              <motion.button className="buy_btn" whileTap={{scale: 1.2}}><Link to='/shop'>SHOP NOW</Link></motion.button>
            </div>
          </Col>
          <Col lg='6' md='6' >
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Services/>
    <section className="trending_products">
      <Container>
        <Row>
          <Col lg ='12' md='12' className='text-center mb-5'>
              <h2 className='section_title'>Trending Products</h2>
          </Col>
          <ProductsList data={trendingProducts}/>
        </Row>
      </Container>
    </section>
    <section className="best_sales">
      <Container>
        <Row>
          <Col lg ='12' md='12' className='text-center mb-5'>
      <h2 className="section_title">Best Sales</h2>
          </Col>
          <ProductsList data={BestProducts}/>
      </Row>
      </Container>
    </section>
    <section className="new_arrivals">
      <Container>
        <Row>
          <Col lg ='12' md='12' className='text-center mb-5'>
          <h2 className='section_title'>New Arrivals</h2>
          </Col>
          <ProductsList data={mobileProducts}/>
          
        </Row>
      </Container>
    </section>
    <section className="popular_category">
    <Container>
        <Row>
          <Col lg ='12' md='12' className='text-center mb-5'>
          <h2 className='section_title'>Popular</h2>
          </Col>
          
          <ProductsList data={winterProducts}/>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home