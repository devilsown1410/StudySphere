import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../navbar/NavBar'

function Home() {
    return (
        <div className='relative pt-[4rem]'>
            <h1 className='text-white text-6xl font-bold pt-8'>Welcome to StudySphere!</h1>
            <p className='text-white font-xl pt-8'>Your one-stop solution for all your study needs.</p>
        </div>
    )
}

export default Home
