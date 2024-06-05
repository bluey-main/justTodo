import { Avatar, Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { CiPower } from 'react-icons/ci'

const Navbar = ({user, signOut}) => {
  return (
    <div className="w-full h-14 bg-[#fa8b23] flex items-center px-5 ">
        <div className="flex gap-x-1 items-center">
        <Avatar src={user.photoURL}/>
        <Typography className="text-xl sm:block hidden ml-4 text-white">{ `Hello ${user.displayName.split(" ")[0]}`}</Typography>
        </div>
        
        <Button className="bg-white text-black ml-auto flex items-center gap-x-3" onClick={() => signOut()}>
            <p className='sm:block hidden'>Sign Out</p>
          
          <CiPower className="text-lg" />
        </Button>
      </div>
  )
}

export default Navbar