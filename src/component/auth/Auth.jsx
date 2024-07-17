import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { IoTimerSharp } from "react-icons/io5";
import { Data } from '../../context/watch';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from "../../assets/logo_amira.png"

const Auth = () => {
    let navigate = useNavigate()
    let  {Handlechange,Formconfirmation,secretKey,encryptId,decryptId} = useContext(Data)
    let [login,setlogin] = useState({
        email : "",
        pass : "",
    })
    const Change = (event)=>{
        Handlechange(event,setlogin,login)
    }
    const Confirm = (event)=>{
        event.preventDefault()
        if (Formconfirmation(login) === 2) {
            const data = new FormData()
            data.append("email",login.email)
            data.append("pass",login.pass)
            axios.post("http://localhost/MY_PROJECTS/cosmetic/auth.php",data).then((res)=>{
                if (!res.data === false) {
                    navigate("/")
                    toast.success("welcome to then dashboard")
                    const encrypt = encryptId(res.data.Id.toString(),secretKey)
                    window.sessionStorage.setItem("token",encrypt)

                } else {
                    toast.error("the email or password are incorrect try again")
                }
            })
        }
    }
  return (
    <>
    <article className='w-4/5  h-[500px] relative  left-1/2 mt-24 sh -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 '>
        <section className='w-full h-full flex border-r-2 border-yellow-300 justify-center items-center'>
            <div className='flex items-center'>
                <img src={logo} alt="pic" className='w-[500px] mix-blend-multiply object-cover'/>
            </div>
        </section>
        <section className='w-full h-full   rounded-md flex flex-col items-center justify-around'>
            <h1 className='text-[40px] text-yellow-400'>LOGIN</h1>
            <form onSubmit={Confirm} className="h-[85%] w-full  flex flex-col items-center justify-center gap-7">
                <TextField name='email' className='w-[90%]' label="Email" type="email" variant="standard" onChange={Change}/>
                <TextField name='pass' className='w-[90%]' label="Password" type="password" variant="standard" onChange={Change}/>
                <button type='submit' className='w-[100px] h-10 text-sm rounded-md sh bg-white text-yellow-700 duration-500 transition-all hover:text-white hover:bg-yellow-700'>Log In</button>
            </form>
        </section>
    </article>

    </>
  )
}

export default Auth