import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>

      <div className="home-page w-screen h-screen relative overflow-hidden">
        <div className='flex'>
          <div className='hidden lg:flex lg:w-[20%] relative'>
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </div>
          <div className='w-full lg:w-[80%]'>
            <Header setSidebarOpen={setSidebarOpen} />
            <div className='pt-26 mx-6 overflow-y-scroll h-[100vh] hide-scrollbar'>
              <Outlet />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Layout
