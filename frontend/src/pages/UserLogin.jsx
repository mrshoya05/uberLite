import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('')

  const [userData, setUserdata] = useState({});

  const submitHandler = (e)=>{
   e.preventDefault()
   setUserdata({
    email: email,
    password: password
   })
   console.log(userData);
   
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
<img className="w-16 mb-10" src="/logo.png" alt="" />

   <div >
   <form onSubmit={(e)=>{
    submitHandler(e)
   }}>
        <h3 className='text-lg font-medium mb-2 '>
        What's your email
        </h3>
        <input 
        className='bg-[#eeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2 '
        type='email' 
        value={email}
         onChange={(e)=>{
            setEmail(e.target.value)
         }}
        required  
         placeholder='example@dot.com'/>
        <h3 className='text-lg font-medium mb-2 '>Enter Password</h3>
        <input 
         className='bg-[#eeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2 '
        type='password' 
        required 
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        placeholder='Password' />
        <button  className='bg-[#111] text-white font-semibold mb-7 rounded px-4  w-full text-lg placeholder:text-base py-2 '> Login</button>

    </form>
    <p className='text-center'>New here ?  <Link 
   className='mb-3 text-blue-600' to={'/signup'}>Create new account</Link></p>
   </div>
   <div>
    <Link to={'/captain-login'} 
    className='bg-[green] text-white font-semibold mb-5 rounded px-4  w-full text-lg placeholder:text-base py-2 flex items-center justify-center '
    >Register as a Captain </Link >
   </div>


    </div>
  )
}

export default UserLogin