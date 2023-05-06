import React, { useCallback, useEffect, useState } from 'react'
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

import AccountMenu from '@/components/AccountMenu'
import MobileMenu from '@/components/MobileMenu'
import NavbarItem from '@/components/NavbarItem'

const TOP_OFFSET = 66

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])

  return (
    <nav className='fixed z-40 w-full'>
      <div
        className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 ${
          showBackground ? 'bg-zinc-900 bg-opacity-90' : ''
        }`}
      >
        <img src='/images/logo.png' className='h-4 lg:h-7' alt='Logo' />
        <div className='ml-8 hidden flex-row gap-7 lg:flex'>
          <NavbarItem label='Home' active />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by Languages' />
        </div>
        <div
          onClick={toggleMobileMenu}
          className='relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden'
        >
          <p className='text-sm text-white'>Browse</p>
          <ChevronDownIcon
            className={`w-4 fill-white text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='ml-auto flex flex-row items-center gap-7'>
          <div className='cursor-pointer text-gray-200 transition hover:text-gray-300'>
            <MagnifyingGlassIcon className='w-6' />
          </div>
          <div className='cursor-pointer text-gray-200 transition hover:text-gray-300'>
            <BellIcon className='w-6' />
          </div>
          <div onClick={toggleAccountMenu} className='relative flex cursor-pointer flex-row items-center gap-2'>
            <div className='h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10'>
              <img src='/images/default-blue.png' alt='' />
            </div>
            <ChevronDownIcon
              className={`w-4 fill-white text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
