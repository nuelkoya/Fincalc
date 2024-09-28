import React from 'react'
import Calculator from '../../components/Calculator/Calculator'
import Footer from '../../components/Footer/Footer'
import Hero from '../../components/Hero/Hero'
import "./Homepage.scss"

const Homepage = () => {
  return (
    <div className="homepage">
        <Hero/>
        <Calculator/>
        <Footer/>
    </div>
  )
}

export default Homepage