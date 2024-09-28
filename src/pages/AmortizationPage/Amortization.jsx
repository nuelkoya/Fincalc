import React, { useEffect, useRef, useState } from 'react'
import "./Amortization.scss"
import { FaDollarSign } from "react-icons/fa";
import { AiOutlinePercentage } from "react-icons/ai";
import { NumberFormatter } from '../../util/Formatter';
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

const Amortization = () => {
  
  const date = new Date()
  const [loanAmount, setLoanAmount] = useState(330000)
  const [loanTerm, setLoanTerm]= useState(30)
  const [interestRate, setInterestRate] = useState(5.27)
  const [loanStartDate, setLoanStartDate] = useState(`${date.getFullYear()}-0${date.getMonth()+1}`)
  const [monthlyPayment, setMonthlyPayment] = useState()
  const [totalInterest, setTotalInterest] = useState()
  const [totalCost, setTotalCost] = useState()
  const [payOffDate, setPayOffDate] = useState()
  


  useEffect(() =>{
    window.scroll({
        top: 0,
        behavior: "smooth",
    });
    calculate()
  },[])

  
  useEffect(() =>{
    calculate()
  },[loanAmount, loanTerm, interestRate, loanStartDate])

  
  



  function generatePricipal(array, loanArray){
    let r = interestRate / 100 / 12
    let p = loanAmount
    let t = loanTerm * 12

    let pmt = (r + (r / (Math.pow((1+r),t) -1))) * p

    let balance = loanAmount
    let overviewInterest = 0
    let overviewPrincipal = 0
    let year = parseInt(loanStartDate.split('-')[0])
    let cacheInterest
    let cachePrincipal
    


    for (let i=0; i < (loanTerm * 12); i++){
        let j = i + 1
        let interest = 0
        let principal = 0
        let offsetYear =  12 - loanStartDate.split('-')[1]
        
        interest = parseFloat(balance) * ((parseFloat(interestRate) / 100 / 12))
        overviewInterest += parseFloat(interest)

        principal = Math.abs(parseFloat(balance) * ((parseFloat(interestRate) / 100 / 12)) - pmt)
        overviewPrincipal += principal
        
        balance = parseFloat(balance) * (parseFloat(interestRate) / 100 / 12) + parseFloat(balance) - (pmt)        
        

        if(j == offsetYear || ((j - offsetYear) % 12 === 0) && j !== 3){
            year +=  1
        }
        
          if (j === (12 - loanStartDate.split('-')[1])){
                cacheInterest = overviewInterest
                cachePrincipal = overviewPrincipal
                array.push(cachePrincipal.toFixed(2))
          }

          if(i === (12 - loanStartDate.split('-')[1])){
            let month = (12 - loanStartDate.split('-')[1])
            let remaining = (parseFloat(loanAmount) * ((parseFloat(interestRate) / 100 / 12) * month) + parseFloat(loanAmount)) - (pmt* 3)
            loanArray.push(remaining.toFixed(2))
          }
          
          if (((j - offsetYear) % 12 === 0) && j !== 3){
                let year = parseInt(loanStartDate.split('-')[0]) + Math.round( j / 12)
                array.push(overviewPrincipal.toFixed(2))
                loanArray.push(balance.toFixed(2))
            } 
            if((balance - pmt) < pmt){
                if(i == (loanTerm * 12) - 1){
                    array.push(overviewPrincipal)
                    loanArray.push(0.00.toFixed(2))
                }  
            }
      }
  }


  let pricipalLabel = []
  let balanceLabel = []
  generatePricipal(pricipalLabel, balanceLabel)


  let startYear = loanStartDate.split('-')[0]


  function generateYear(array){
      for (let i = 0; i <= loanTerm; i++){
          array.push(parseInt(startYear) + i)
      }
  }
  let yearLabel = []
  generateYear(yearLabel)
  
  


  const options ={
                    maintainAspectRatio: false,
                }
  const data = {
      labels: yearLabel,
      datasets: [{
                    label: "Principal Paid",
                    data: pricipalLabel,
                    borderColor: [
                        'rgb(5, 240, 107)'
                    ]
                },
                {
                    label: "Loan Balance",
                    data: balanceLabel,
                    borderColor: [
                      'rgb(237, 7, 7)'
                    ]
                },
        ]
    }

    




  function calculate(){
      let r = interestRate / 100 / 12
      let p = loanAmount
      let t = loanTerm * 12
      let totalCost
      let totalInterest

      let pmt = (r + (r / (Math.pow((1+r),t) -1))) * p
      totalCost = pmt * t
      totalInterest = totalCost - p
      setMonthlyPayment(NumberFormatter.format(Math.round(pmt)))
      setTotalCost(NumberFormatter.format(Math.round(totalCost)))
      setTotalInterest(NumberFormatter.format(Math.round(totalInterest)))

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"]
    
      let futureMonth = months.find((month,index) => index+1 == loanStartDate.split('-')[1])
      let futureYear = parseInt(loanStartDate.split('-')[0]) + parseInt(loanTerm)
      setPayOffDate(`${futureMonth}${futureYear}`)  
  }

    


  return (
    <div className="wrapper">
        <div className="container">
            <div className="title">
                <h1>Amortization Calculator</h1>
                <p>
                    Amortization is the process of paying off a debt over time in equal installments. 
                    To use our amortization calculator, type in a dollar figure under “Loan amount.” 
                    Adjust “Loan term,” “Interest rate” and “Loan start date” to customize the amortization 
                    schedule.
                </p>
            </div>

            <div className="innerContainer">
                <div className="left">
                    <label htmlFor="">Loan Amount</label>
                    <div className="inputDiv">
                        <FaDollarSign/>
                        <input type="number" 
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                        />
                    </div>

                    <label htmlFor="">Loan Term</label>
                    <select name="" id=""
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                    >
                        <option value="30">30 years</option>
                        <option value="20">20 years</option>
                        <option value="15">15 years</option>
                        <option value="10">10 years</option>
                    </select>

                    <label htmlFor="">Interest Rate</label>
                    <div className="inputDiv">
                        <input type="number" 
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                        />
                        <AiOutlinePercentage/>

                    </div>


                    <label htmlFor="">Loan Start Date</label>
                    <div className="inputDiv">
                        <input type="month" min="1960-01" 
                            value={loanStartDate} 
                            onChange={(e) => setLoanStartDate(e.target.value)}
                        />
                    </div>
                    
                </div>
                <div className="right">
                    <div className="top">
                        <div className="summary">
                            <p>Summary</p>
                            <p>Number of payments: 300</p>
                        </div>

                        <div className="summaryNumber">
                                
                            <div>
                                <p>Monthly Payment</p>
                                <div className="amount">
                                    <sup>$</sup>
                                    <h3>{monthlyPayment}</h3>
                                </div>
                            </div>

                            <div>
                                <p>Total interest paid</p>
                                <div className="amount">
                                    <sup>$</sup>
                                    <h3>{totalInterest}</h3>
                                </div>
                                
                            </div>

                            <div>
                                <p>Total cost of loan</p>
                                <div className="amount">
                                    <sup>$</sup>
                                    <h3>{totalCost}</h3>
                                </div>
                                
                            </div>

                            <div>
                                <p>Payoff date</p>
                                <h3>{payOffDate}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="btns">
                        <button className="active">Chart</button>
                    </div>
                    <div className="bottom">
                        <div className="chart">
                            <div className="chartTop">
                                <h2>How payments change over the life of a 30-year loan</h2>
                                <p>
                                    As the term of your mortgage progresses, 
                                    a larger share of your payment goes toward paying down the 
                                    principal until the loan is paid in full at the end of your term.</p>
                            </div>
                            <div className="chartBottom">
                                <div className="chartBottomLeft">
                                    <Line
                                        options={options}
                                        data={data}   
                                    />
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
  )
}

export default Amortization