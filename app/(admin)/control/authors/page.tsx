"use client";
import React from 'react'
import Heading from '../components/Heading';
import Button from '@/app/components/Button';
import { useModalContext } from '@/app/context/ModalContext';

const Page = () => {
    const {openModal} = useModalContext();
  return (
    <div className='sm:mt-10 pl-2'>
        <Heading title='Authors'>
            <div className='text-md'>
                <Button onClick={()=>{
                    openModal("addAuthor");
                }}>Add Authors</Button>
            </div>
        </Heading>
    </div>
  )
}

export default Page