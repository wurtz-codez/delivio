import React, { useContext, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios'

const Header = () => {

  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI ? state.userAPI.isLogged : [false, () => {}];
  const [isAdmin, setIsAdmin] = state.userAPI ? state.userAPI.isAdmin : [false, () => {}];

  console.log(state)
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logoutUser= async() => {{
    await axios.get('/user/logout')

    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }}

  const adminRouter = () => {
    return(
      <>
      <li><Link to='/create_product'>Create Product</Link></li>
      <li><Link to='/category'>Categories</Link></li>
      </>
    )
  }

  const loggedRouter = () => {
    return(
      <>
      <li><Link to='/history'>Order History</Link></li>
      <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }

  return (
    <header>
      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin?'Admin Dashboard':<img src='/images/logo.svg' alt="Logo"></img>}</Link>
        </h1>
      </div>

      <div className='menu-icon' onClick={toggleMenu}>
        {menuOpen ? <IoCloseOutline size={30} /> : <FiMenu size={30} />}
      </div>

      <ul className={`nav-buttons ${menuOpen ? 'open' : ''}`}>
        <li><Link to='/' className='nav-link'>{isAdmin?'Products':'Catalogue'}</Link></li>
        
        <li><Link to='/' className='nav-link'>About Us</Link></li>
        <li><Link to='/' className='nav-link'>Contact Us</Link></li>
      </ul>

      <ul className='functionality'>
        <input
          className='search-bar'
          type="text"
          placeholder="Search..."
        />
        {
          isAdmin ? '': <div className='cart-icon'>
          <span>0</span>
          <Link to='/cart'><FiShoppingCart /></Link>
        </div>
        }      
        
        {isAdmin && adminRouter()}{
          isLogged ? loggedRouter() : <button className='login-button'>
          <Link to='/login'>SignUp</Link>
        </button>
        }
        
      </ul>
    </header>
  )
}

export default Header