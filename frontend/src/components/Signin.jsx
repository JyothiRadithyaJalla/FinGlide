import React from 'react'
import { useState,useEffect } from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/coreThunks'


function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUsername,setUsername] = useState('')
  const [loginPassword,setPassword] = useState('')

  const  isUserLoggedIn  = useSelector((s) => s.core.isUserLoggedIn);

  const gradientStyle = {
    background: 'radial-gradient(circle, #FFFBF3, #da6e39)',
  };

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username: loginUsername,
        password: loginPassword,
      })
    );
  }


  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isUserLoggedIn, navigate]);


  return (
    <div style={gradientStyle} className='h-screen flex items-center justify-center'>
      <div className='bg-[#FFFBF3] p-[40px] rounded-lg shadow-lg w-[460px]'>
        <div className='text-center mb-10 flex flex-col items-center justify-between h-[150px]'>
          <div className='rounded-[50%] p-2 bg-[#da6e39]'>
            <img className='w-[60px]' src='https://res.cloudinary.com/dtrouncfb/image/upload/v1756573796/LogoMakr-0It9qV_n5txbu.png'/>
          </div>
          <div>
            <h1 className='text-[#3F3831] text-[25px] font-[600]'>Welcome to FinGlide</h1>
            <p className='text-gray-600'>Sign in to your account to manage your expenses</p>
          </div>
        </div>
        <form className='my-5' onSubmit={handleSubmit}>
          <div className='flex flex-col mb-6'>
            <label className='mb-2 text-[#473624] font-[600] text-[18px]'>Username</label>
            <input className='border-1 rounded p-1 outline-none ' name='username' required placeholder='Enter username' type='text' value={loginUsername} onChange={handleUsername}/>
          </div>
          <div className='flex flex-col mb-7'>
            <label className='mb-2 text-[#473624] font-[600] text-[18px]'>Password</label>
            <input className='border-1 rounded p-1 outline-none' required placeholder='Enter password' type='password' value={loginPassword} onChange={handlePassword}/>
          </div>
          <div className='flex flex-col justify-center'>
            <button className='p-1 rounded bg-[#D86D38] text-[#FFFBF3] font-[600] cursor-pointer'>Sign in</button>
          </div>
        </form>
        <div>
          <p className='text-[#414141] text-[17px]'>Don't have an account? <Link to="/register/" className='text-blue-500'>Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signin