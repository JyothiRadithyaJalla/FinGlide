import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SideBar from './MainSideBar'


function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1 w-full">
          <div className="">
            <SideBar />
          </div>        

          <main className="flex-1 md:ml-16 xl:ml-[296px]">
            <div className="px-4 py-5 sm:px-6 xl:px-8">
              <Outlet />
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
    
  )
}

export default Layout
