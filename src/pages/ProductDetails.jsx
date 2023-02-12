import { motion } from 'framer-motion'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommoSection'
import '../styles/product_details.css'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = products.find(item => item.id === id)
  const { imgUrl, productName, price, avgRating, shortDesc } = product

  const addTocart = () =>{
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price,
    })
    );
    toast.success('Product added to the Cart')
  }

 
  return <Helmet title={productName}>
    <CommonSection title={productName}/>
    <section className='pt-2'>
      <Container>
        <Row>
          <Col lg='6'>
            <img src={imgUrl} alt="" />
          </Col>
          <Col lg='6'>
            <div className="product_details">
              <h2>{productName}</h2>
              <div className="product_rating d-flex align-items-center gap-5 mb-3">
                <div>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-s-fill"></i></span>
                  <span><i class="ri-star-half-s-line"></i></span>
                </div>
                <p>(<span>{avgRating}</span>rating)</p>
              </div>
              <span className='prosuct_price'>${price}</span>
              <p className='mt-3'>{shortDesc}</p>
              <motion.button whileTap={{scale: 1.2}} className="buy_btn" onClick={addTocart}>Add to Cart</motion.button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default ProductDetails