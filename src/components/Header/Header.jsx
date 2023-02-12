import React, { useRef, useEffect } from 'react'
import { Container, Row } from 'reactstrap'
import './header.css'
import { useSelector } from 'react-redux'
import logo from '../../assets/images/eco-logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userIcon from '../../assets/images/user-icon.png'
import { motion } from 'framer-motion'
import useAuth from "../../custom-hooks/useAuth"
import { signOut } from 'firebase/auth'
import {auth} from '../../firebase.config'
import { toast } from 'react-toastify'
const nav_links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
]

const Header = () => {
    const hesderRef = useRef(null)
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const profileActionRef = useRef(null)
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth()
    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                hesderRef.current.classList.add('sticky_header')
            } else {
                hesderRef.current.classList.remove('sticky_header')
            }
        });

    };

    const logout =() =>
    {
        signOut(auth).then(()=>{
            toast.success("Logged out")
            navigate('/home')
        }) .catch(err=>{
            toast.error(err.message)
        })
    }

    useEffect(() => {
        stickyHeaderFunc();
        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    });

    const menuToggle = () => menuRef.current.classList.toggle('active_menu')
    const navigateToCart = () => { navigate('/cart'); };

    const toogleProfile = () => profileActionRef.current.classList.toggle('show_profileActions')
    return <header className="header" ref={hesderRef}> 
        <Container>
            <Row>
                <div className='nav_wrapper'>
                    <div className='logo'>
                        <img src={logo} alt="logo" />
                        <div>
                            <h1>Floria</h1>

                        </div>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className='menu'>
                            {
                                nav_links.map((item, index) => (
                                    <li className='nav_item' key={index}>
                                        <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav_active' : ""}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="nav_icons">
                        
                        <span className='cart_icon' onClick={navigateToCart}>
                            <i class="ri-shopping-bag-line"></i>
                            <span className='badge'>{totalQuantity}</span>
                        </span>
                        <div className='profile'><motion.img whileTap={{ scale: 1.2 }} src={currentUser ?
                            currentUser.photoURL : userIcon} alt="" onClick={toogleProfile}/>

                            <div className="profile_actions" ref={profileActionRef} onClick={toogleProfile}>
                                { currentUser ? (<span onClick={logout}>Logout</span>) : (
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <Link to='/signup'>Signup</Link>
                                    <Link to='/login'>Login</Link>
                                    <Link to='/dashboard'>Dashboard</Link>
                                    
                                </div>
                                )
                                }
                            </div>
                        </div>
                        <div className="mobile_menu">
                            <span onClick={menuToggle}>
                                <i class="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>



                </div>
            </Row>
        </Container>
    </header>
}

export default Header