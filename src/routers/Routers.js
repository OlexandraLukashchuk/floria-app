import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Users from '../admin/Users'
import Dashboard from '../admin/Dashboard'
const Routers = () => {
  return <Routes>
    <Route path='/' element={<Navigate to='/home'/>}/>
    <Route path='home' element={<Home/>}/>
    <Route path='shop' element={<Shop/>}/>
    <Route path='shop/:id' element={<ProductDetails/>}/>
    <Route path='cart' element={<Cart/>}/>
    <Route path='/*' element={<ProtectedRoute/>}>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='dashboard/users' element={<Users/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
    </Route>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<Signup/>}/>
  </Routes>
    
  
}

export default Routers