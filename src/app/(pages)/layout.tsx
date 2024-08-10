import React, { Children } from 'react'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

interface layoutProps {
    children : React.ReactNode
}

const Dashboardlayout = async ({children}:layoutProps) => {

   const session = await getServerSession(authOptions);
  if(!session || !session.user?.email){
    redirect('login')
  }
  

  return (
    <>
      <Navbar />
      <div className="pl-[2rem] flex flex-col-2">
        <div className="block h-screen w-[200px] mr-2 pt-1">
          <SideBar />
        </div>
        <div className="pt-4 w-full">{children}</div>
      </div>
    </>
  );
}

export default Dashboardlayout