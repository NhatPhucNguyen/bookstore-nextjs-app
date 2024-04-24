import React, { ReactNode } from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Authors",
    description: "Authors page for BookFinder",
};
const AuthorsLayout = ({children}:{children:ReactNode}) => {
  return (
    <>{children}</>
  )
}

export default AuthorsLayout