import React from 'react'
import "./Footer.scss"
import { FaRegCopyright } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";



const Footer = () => {

  const date = new Date()
  let year = date.getFullYear()
  console.log(year)
  return (
    <div className="footer">
        <div className="container">
            <div className="icons">
                <a href="">
                    <LuFacebook  size={25}/>
                </a>
                <a href="">
                    <BsTwitterX size={25}/>
                </a>
                <a href="">
                    <FaInstagram size={25}/>
                </a>
                <a href="">
                    <SlSocialLinkedin size={25}/>
                </a>     
            </div>
            <div className="right">
                <FaRegCopyright />
                <span>{year} Fincalc, LLC. All Rights Reserved</span>
            </div>
        </div>
    </div>
  )
}

export default Footer