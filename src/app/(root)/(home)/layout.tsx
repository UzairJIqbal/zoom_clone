
import Navbar from '@/components/Navbar'
import  Sidebar  from '@/components/Sidebar'
import { Metadata } from 'next'
import React, { ReactNode } from 'react'

export const metadata : Metadata = {
  title : "YOOM",
  description : "Video calling app",
  icons : {
    icon : '/Icons/logo.svg'
  }
}


const HomeLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main className="relative">
            <Navbar/>

            <div className="flex">
                <Sidebar />
                <section className="flex-1 flex flex-col min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                    <div className="w-full">{children}</div>
                </section>
            </div>
        </main >
    )
}

export default HomeLayout
