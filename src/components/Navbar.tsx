import React from 'react'
import ToggleTheme from './ToggleTheme'
import AvatarComponent from './AvatarComponent'

const Navbar = () => {
  return (
    <div className='container  flex py-2 shadow-sm justify-between'>
        <h1 className='text-4xl font-bold'>All In One</h1>
        <div className='flex gap-3'>
          <ToggleTheme />
          <AvatarComponent />
        </div>
    </div>
  )
}

export default Navbar