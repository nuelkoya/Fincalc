import React from 'react'
import "./Calculator.scss"
import { Link } from 'react-router-dom';
import { MdOutlineSavings } from "react-icons/md";
import { PiHouseLineBold } from "react-icons/pi";


const Calculator = () => {
  return (
    <div className="calculator">

        <div className="container">
            <Link to="/compound-interest">
                    <div className="card">
                        <MdOutlineSavings size={30}/>
                        <p>Compound Interest Calculator</p>
                    </div>
                </Link>
                    
                
                <Link to="/amortization">
                    <div className="card">
                        <PiHouseLineBold size={30}/>
                        <p>Amortization Calculator</p>
                    </div>
                </Link>
        </div>
        
        
            
            
                
            
            
        
    </div>
  )
}

export default Calculator