import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage'


import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import CompountInterest from './pages/InterestPage/CompountInterest'
import Amortization from './pages/AmortizationPage/Amortization'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar/>,
      children: [
        {
          path: "/",
          element: <Homepage/>
        },
        {
          path: "/compound-interest",
          element: <CompountInterest/>
        },
        {
          path: "/amortization",
          element: <Amortization/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
