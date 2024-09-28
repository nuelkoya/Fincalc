import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import "./Navbar.scss"



const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="container">
            <Link to="/" className="navLink">
                <h1>FinCalc</h1>
            </Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default Navbar
