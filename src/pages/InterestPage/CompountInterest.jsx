import React, { useEffect, useState } from 'react'
import "./CompoundInterest.scss"
import { FaDollarSign } from "react-icons/fa";
import { AiOutlinePercentage } from "react-icons/ai";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)





const CompountInterest = () => {
  const [initialDeposit, setInitialDeposit] = useState(1000)
  const [numberOfYears, setNumberOfYears] = useState(10)
  const [interestRate, setInterestRate] = useState(5)
  const [compoundFrequency, setCompoundFrequency] = useState("Annually")
  const [estimatedSavings, setEstimatedSavings] = useState(0)
  const [totalAmountGain, setTotalAmountGain] = useState(0)
  const [calculateBtn, setCalculateBtn] = useState(false)
  
  

  



  
  function generateYLabel(array,num){
    for (let i = 0; i<= num; i++){
      array.push(i);
    }
  }
 
    let yLabel= []
    generateYLabel(yLabel, numberOfYears)
    console.log(yLabel)

    
    

 
    function generateXLabel(array, compoundFrequency){
        let futureValue = parseFloat(initialDeposit)

        if(compoundFrequency === "Monthly"){
            for(let i = 0; i< (numberOfYears * 12); i++) {
                futureValue += ((futureValue) * interestRate / 100/ 12)
                if((i + 1) % 12 == 0 && i > 0){
                    console.log(i)
                    array.push(futureValue.toFixed(2))
                }   
            }      
        }
    
    
          if(compoundFrequency === "Annually"){
            for(let i = 0; i< (numberOfYears); i++) {
                futureValue = ((futureValue * (interestRate / 100)  + futureValue))
                array.push(futureValue.toFixed(2))
            }
          }
    
    
          if(compoundFrequency === "Daily"){
            for(let i = 0; i< (numberOfYears * 365); i++) {
                futureValue = ((futureValue * (interestRate / 100/ 365)  + futureValue)) 
                if((i + 1) % 365 == 0 && i > 0){
                    array.push(futureValue.toFixed(2))
                }
            }   
          }  
    }

    let xLabel = [initialDeposit]
    generateXLabel(xLabel, compoundFrequency)
    console.log(xLabel)


    useEffect(() =>{
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
        calculate()
    }, [])

    useEffect(() =>{
        calculate()
    }, [calculateBtn])

    useEffect(() => {
        if(calculateBtn){
            calculate()
        }
    },[initialDeposit, numberOfYears, interestRate, compoundFrequency])
  
  
  
  function calculate(){

    let futureValue = parseFloat(initialDeposit)
    let amountGain = 0
      
    if(compoundFrequency === "Monthly"){
        for(let i = 0; i< (numberOfYears * 12); i++) {
            futureValue += ((futureValue) * interestRate / 100/ 12)
          } 
          setEstimatedSavings(futureValue)
          setTotalAmountGain(futureValue - initialDeposit)
          amountGain = (futureValue - initialDeposit).toFixed(2)
          console.log('amount gain')
    }


      if(compoundFrequency === "Annually"){
        for(let i = 0; i< (numberOfYears); i++) {
            futureValue = ((futureValue * (interestRate / 100)  + futureValue))
          }
          setEstimatedSavings(futureValue)
          setTotalAmountGain(futureValue - initialDeposit)
          amountGain = (futureValue - initialDeposit).toFixed(2)
        }


      if(compoundFrequency === "Daily"){
        for(let i = 0; i< (numberOfYears * 365); i++) {
            futureValue = ((futureValue * (interestRate / 100/ 365)  + futureValue))
          }
          setEstimatedSavings(futureValue)
          setTotalAmountGain(futureValue - initialDeposit)
          amountGain = (futureValue - initialDeposit).toFixed(2)
          console.log('amount gain')
      }  
  
  }


 

  const options ={maintainAspectRatio: false}
  const data = {
      labels: yLabel,
      datasets: [{
              label: "Balance by year",
              data: xLabel,
              borderColor: [
                'rgb(55, 91, 237)'
              ]
          }]
    }
  

  


  


  return (
    <div className="wrapper">
        <div className="c-container">
            <div className="title">
                <h1>Compound Interest Calculator</h1>
            </div>

            <div className="innerContainer">
                <div className="left">
                    <label htmlFor="initialDeposit">Intial Deposit</label> 
                    <div className="inputDiv" 
                        onClick={(e) => handleFocusToggle(e)}
                        
                    >
                        <FaDollarSign />
                        <input type="number"
                            value={initialDeposit}
                            onChange={(e) => setInitialDeposit(e.target.value)}
                            id="initialDeposit"
                            
                        />
                    </div>
                    
                    <label htmlFor="numberOfYears">Years of Growth</label>
                    <div className="inputDiv">
                        <input type="number" 
                            value={numberOfYears}
                            onChange={(e) => setNumberOfYears(e.target.value)}
                            id="numberOfYears"
                        />
                    </div>
                    

                    <label htmlFor="interestRate">Interest Rate</label>
                    <div className="inputDiv">
                        <input type="number" 
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            id="interestRate"
                        />
                        <AiOutlinePercentage />
                    </div>                 

                    <label htmlFor="compoundFrequency">Compound Frequency</label>
                    <select name="compoundFrequency" id="compoundFrequency"
                        onChange={(e) => setCompoundFrequency(e.target.value)}
                        defaultValue={"Annually"}
                    >
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Annually" >Annually</option>
                    </select>
                    
                    
                    <button 
                        onClick={() => calculate()}
                        onClick={() => setCalculateBtn(true)}
                    >Calculate</button>
                </div>
                <div className="right">
                    <div className="top">
                        <div className="savings">
                            <p>Your estimated savings</p>
                            <p>${estimatedSavings.toFixed(2)}</p>
                        </div>

                        <div className="savingsBottom">
                            <div className="interest">
                                <p>Total amount gain</p>
                                <p>${totalAmountGain.toFixed(2)}</p>
                            </div>
                        </div>

                    </div>
                    <div className="bottom">
                        <div className="chart">
                            <Line
                                options={options}
                                data={data}
                                
                            />
                        </div>

                    </div>
                </div>
            </div>

            <div className="bottomSection">
                <div className="definition">
                    <h2>What is compound interest?</h2>
                    <p>Compound interest is when the interest you earn, earns interest. 
                        It helps boost the growth of your money over time.</p>
                </div>

                <div className="formulaCard">
                    <div className="formula">
                        <h3>Formula for calculating the final value of an investment that’s compounded:</h3>
                        <p>Amount = P(1 + r/n)<sup>nt</sup></p>
                    </div>

                    <ul>
                        <li>P = initial investment; </li>
                        <li>r = interest rate </li>
                        <li>t = compounded periods per year</li>
                        <li>n = number of years</li>
                    </ul>

                </div>
            </div>
            
        </div>
    </div>
  )
}

export default CompountInterest