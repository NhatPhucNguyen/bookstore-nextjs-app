import { Metadata } from 'next';
import { ReactNode } from 'react';
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