import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page for BookFinder",
};
const DashBoard = () => {
  return (
    <div className='sm:mt-10'>
      <h1 className='text-center text-2xl font-bold'>Welcome to your dashboard, BookFinder</h1>
      <section >

      </section>
    </div>
  )
}

export default DashBoard