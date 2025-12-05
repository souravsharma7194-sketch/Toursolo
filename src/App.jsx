import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Explore from './pages/Explore'
import TripDetails from './pages/TripDetails'
import Dashboard from './pages/Dashboard'
import About from './pages/About'

function App() {

  return (
    <BrowserRouter>
    
  <Navbar/>  
    
    <Routes>
<Route path='/' element = {<Home/>}  />
<Route path='/explore' element = {<Explore/>}  />
<Route path='/trip/:id' element = {<TripDetails/>}  />
<Route path='/dashboard' element = {<Dashboard/>}  />
<Route path='/about' element = {<About/>}  />



    </Routes>
    
    <Footer/>
    
  </BrowserRouter>
  )
}

export default App
