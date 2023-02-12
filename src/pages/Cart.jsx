import React from 'react'
import "../styles/cart.css"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommoSection"
import { Container, Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'
import {cartActions} from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const Cart = () => {

const cartItems = useSelector(state => state.cart.cartItems)
const totalAmount = useSelector(state =>state.cart.totalAmount)



  return <Helmet title="Cart">
    <CommonSection title="Shopping Cart"/>
  <section>
    <Container>
      <Row>
        <Col lg='9'>
          {
            cartItems.length===0 ? (<h2 className='fs-4 text-center'>No item added to cart</h2>)
            :(
          
          <table className='table bordered'>
            
            <tbody>
              {
                cartItems.map((item, index)=>(
                <Tr item={item} key = {index}/>
                ))
              }
            </tbody>
          </table>
)}
        </Col>
        <Col lg='7'>
          <div>
            <h6>Subtotal</h6>
            <span>${totalAmount}</span>
          </div>
          <div>
            <button className="buy_btn w-100"><Link to='/shop'>Continue Shopping</Link></button>
            <button className="buy_btn w-100 mt-3"><Link to='/checkout'>Checkout</Link></button>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  </Helmet>
}



const Tr = ({item}) => {

  const dispatch = useDispatch();
  const deleteProduct =() => {
    dispatch(cartActions.deleteItem(item.id))
  }
  const {id,title,price,  imgUrl} = item;

  const incrementItem = () => {
    dispatch(cartActions.addItem({
      id,
      title,
      price,
      imgUrl
    }))}
    const decrementItem = () => {
      dispatch(cartActions.removeItem(id))}
  return( <tr >
  <td><img src={item.imgUrl} alt="" /></td>
  <td>{item.productName}</td>
  <td>${item.price}</td>
  <td><button onClick={incrementItem} >+</button>{item.quantity}px<button onClick={decrementItem} >-</button></td>
  <td><motion.i whileTap={{scale: 1.2}} onClick={deleteProduct} class="ri-delete-bin-line"></motion.i></td>
</tr>)
}
export default Cart