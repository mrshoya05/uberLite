import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('')
  
    const [captainData, setCaptaindata] = useState({});
  
    const submitHandler = (e)=>{
     e.preventDefault()
     setCaptaindata({
      email: email,
      password: password
     })
     console.log(captainData);
     
      setEmail('')
      setPassword('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
<img className="w-16 mb-5" src="https://pngimg.com/d/uber_PNG24.png" alt="" />

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
    <p className='text-center'>Join a fleet <Link 
   className='mb-3 text-blue-600' to={'/captain-signup'}>Create new account</Link></p>
   </div>
   <div>
    <Link  to={'/login'} 
    className='bg-[orange] text-white font-semibold mb-5 rounded px-4  w-full text-lg placeholder:text-base py-2 flex items-center justify-center '
    >Sign in as User </Link >
   </div>


    </div>
  )
}

export default CaptainLogin