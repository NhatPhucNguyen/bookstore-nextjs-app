import { metadata } from '@/app/layout';
import { mainTitle } from '@/app/utils/globalVariables';
metadata.title = mainTitle + ' | Dashboard';
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