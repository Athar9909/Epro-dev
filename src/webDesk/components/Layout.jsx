import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
// import AppSideBar from './AppSideBar'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>

      <div className="home-page w-screen h-screen relative overflow-hidden">
        <div className='flex'>
          <div className={`${sidebarOpen ? 'flex' : 'hidden'} lg:flex lg:w-[20%] relative`}>
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            {/* <AppSideBar/> */}
          </div>
          <div className='w-full lg:w-[80%]'>
            <Header setSidebarOpen={setSidebarOpen} />
            <div className='pt-20 overflow-y-scroll h-[100vh] hide-scrollbar bg-[#f6f7f9]'>
              <Outlet />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Layout
