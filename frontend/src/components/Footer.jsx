import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

function Footer() {
  return (
    <footer className='min-w-full bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700'>
      <div className='mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='col-span-1'>
            <div className='flex items-center mb-4'>
              <div className='rounded-full p-1 bg-[#da6e39] mr-2'>
                <img className='w-12' src='https://res.cloudinary.com/dtrouncfb/image/upload/v1756573796/LogoMakr-0It9qV_n5txbu.png' alt='FinGlide Logo'/>
              </div>
              <h2 className='text-2xl font-bold text-white'>FinGlide</h2>
            </div>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Effortless finance management at your fingertips. Track expenses, manage budgets, and achieve financial goals.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link to='/' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>Dashboard</Link></li>
              <li><Link to='/accounts' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>Accounts</Link></li>
              <li><Link to='/categories' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>Categories</Link></li>
              <li><Link to='/transactions' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>Transactions</Link></li>
              <li><Link to='/budgets' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>Budgets</Link></li>
              <li><Link to='/reports' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>Reports</Link></li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>About Us</h3>
            <p className='text-gray-300 text-sm leading-relaxed mb-3'>
              FinGlide is your trusted companion for financial management, helping you make informed decisions and achieve financial freedom.
            </p>
            <div className='flex space-x-3'>
              <a href='#' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>
                <FaTwitter size={20} />
              </a>
              <a href='#' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>
                <FaLinkedin size={20} />
              </a>
              <a href='#' className='text-gray-300 hover:text-[#F96C4A] transition-colors'>
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Contact Us</h3>
            <ul className='space-y-3'>
              <li className='flex items-start text-gray-300 text-sm'>
                <MdEmail className='mr-2 mt-1 flex-shrink-0' size={18} />
                <span>support@finglide.com</span>
              </li>
              <li className='flex items-start text-gray-300 text-sm'>
                <MdPhone className='mr-2 mt-1 flex-shrink-0' size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className='flex items-start text-gray-300 text-sm'>
                <MdLocationOn className='mr-2 mt-1 flex-shrink-0' size={18} />
                <span>123 Finance Street, Business District</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className='my-6 border-gray-700' />

        <div className='text-center text-gray-400 text-sm'>
          <p>&copy; {new Date().getFullYear()} FinGlide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
