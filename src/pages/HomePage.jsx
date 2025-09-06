import React from 'react'
import Header from '../Header/Header'
import DreamPage from '../landing page/DreamPage'
import Company from '../landing page/Company'
import JobCategory from '../landing page/JobCategory'
import Working from '../landing page/Working'
import Textinomials from '../landing page/Textinomials'
import Subscribe from '../landing page/Subscribe'
import Footer from '../landing page/Footer'

const HomePage = () => {
  return (
    <div className='min-h-[100vh] bg-mine-shaft-950 font-poppins !pt-24 overflow-x-hidden'>
       {/* <Header /> */}
       <DreamPage />
       <Company />
       <Working />
       <Textinomials />
       <Subscribe />
       {/* <Footer /> */}
    </div>
  )
}

export default HomePage
