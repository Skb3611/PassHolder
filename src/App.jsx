import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Heading from './Components/Heading'
import Manager from './Components/Manager'
function App() {
  

  return (
   <>
   <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
   <Navbar/>
   <Heading/>
   <Manager/>
   </div>
   </>
  )
}

export default App
