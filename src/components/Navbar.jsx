import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (

    <div className='w-full p-4 bg-white shadow-md'>
    <div className='max-w-6xl mx-auto flex justify-between items-center'>

<h1 className='text-2xl font-bold'>TourSolo</h1>

<div className='flex space-x-6 font-medium'>

<Link to='/'>HOME</Link>
<Link to='/explore'>EXPLORE</Link>
<Link to='/dashboard'>DASHBOARD</Link>
<Link to='/about'>ABOUT US</Link>

</div>


    </div>

    </div>
  )
}

export default Navbar