import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoHomeOutline,IoWalletOutline,IoLogOutOutline,IoTrashOutline} from "react-icons/io5"
import { LuTags, LuChartPie } from "react-icons/lu"
import { LiaCreditCardSolid } from "react-icons/lia"
import { TbReportSearch } from "react-icons/tb"
import { useDispatch } from 'react-redux'
import { logoutUserThunk, deleteUserThunk } from '../redux/coreThunks'

function SideBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const success = await dispatch(logoutUserThunk());
    if (success) {
      navigate("/login", { replace: true });
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    const success = await dispatch(deleteUserThunk());
    if (success) {
      navigate("/register", { replace: true });
    }
  }

  return (
    <aside className="hidden md:block sticky top-0 h-screen z-30">
      <div className="relative h-full group">
        
        <div className="absolute left-0 top-0 h-full w-16 group-hover:w-[296px] xl:w-[296px] transition-[width] duration-300 ease-in-out will-change-[width] overflow-hidden bg-gradient-to-b from-orange-100 via-white to-orange-100 border-r border-gray-900 flex flex-col " >
          <div className="flex items-center gap-3 py-4 px-3">
            <div className="rounded-full p-1 bg-[#da6e39] shrink-0">
              <img className="w-8 h-8" src="https://res.cloudinary.com/dtrouncfb/image/upload/v1756573796/LogoMakr-0It9qV_n5txbu.png" alt="logo"/>
            </div>
            <div className="hidden group-hover:block xl:block whitespace-nowrap">
              <img className="w-[90px]" src="https://res.cloudinary.com/dtrouncfb/image/upload/v1756719245/LogoMakr-44Pg4a_qp9nad.png" alt="FinGlide"/>
              <p className="text-[9px] text-[#7D5555]">Effortless finance, at your fingertips</p>
            </div>
          </div>

          <hr />

          <nav className="flex-1 py-3 space-y-3 px-3">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? 'bg-[#F96C4A] text-white' : 'text-[#505050] hover:bg-[#F96C4A] hover:text-white'}`}>
              <IoHomeOutline size={20} className="shrink-0" />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">Dashboard</span>
            </NavLink>

            <NavLink to="/accounts" className={({ isActive }) => `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? 'bg-[#F96C4A] text-white' : 'text-[#505050] hover:bg-[#F96C4A] hover:text-white'}`}>
              <IoWalletOutline size={20} className="shrink-0" />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">Accounts</span>
            </NavLink>

            <NavLink to="/categories" className={({ isActive }) => `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? 'bg-[#F96C4A] text-white' : 'text-[#505050] hover:bg-[#F96C4A] hover:text-white'} `}>
              <LuTags size={20} className="shrink-0" />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">Categories</span>
            </NavLink>

            <NavLink to="/transactions" className={({ isActive }) =>`flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? 'bg-[#F96C4A] text-white' : 'text-[#505050] hover:bg-[#F96C4A] hover:text-white'}`}>
              <LiaCreditCardSolid size={20} className="shrink-0" />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">Transactions</span>
            </NavLink>

            <NavLink to="/budgets" className={({ isActive }) => `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? 'bg-[#F96C4A] text-white' : 'text-[#505050] hover:bg-[#F96C4A] hover:text-white'} `}>
              <LuChartPie size={20} className="shrink-0" />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">Budgets</span>
            </NavLink>

            <NavLink to="/reports" className={({ isActive }) => `flex items-center gap-3 py-2 px-2 rounded transition-colors ${isActive ? 'bg-[#F96C4A] text-white': 'text-[#505050] hover:bg-[#F96C4A] hover:text-white'}`}>
              <TbReportSearch size={20} className="shrink-0" />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">Reports</span>
            </NavLink>
          </nav>


          <div className="py-3 space-y-2 px-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-2 py-2 bg-[#F96C4A] text-white rounded cursor-pointer"
            >
              <IoLogOutOutline size={20} />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">
                Logout
              </span>
            </button>

            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-2 px-2 py-2 bg-[#F96C4A] text-white rounded cursor-pointer"
            >
              <IoTrashOutline size={20} />
              <span className="hidden group-hover:inline xl:inline whitespace-nowrap">
                Delete Account
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
