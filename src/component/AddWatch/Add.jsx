import React from 'react'
import { useContext } from 'react';
import { Data } from '../../context/watch';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from "axios"
const Add = () => {
    let navigate = useNavigate()
    const {Handlechange,Formconfirmation} = useContext(Data)
    let [AddWatch,setAddWatch] = useState({
        Nom : "",
        type : "homme",
        description : "",
        prix : "",
        pic : "",
        qte : ""
    })
    // this function for handle change
    const InputChange = (event)=>{
        Handlechange(event,setAddWatch,AddWatch)
      }
      // this function for createaccount confirmation
      const Addproduct = (event)=>{
          event.preventDefault();
          if (Formconfirmation(AddWatch) === 6) {
            const Data = new FormData()
            Data.append("name",AddWatch.Nom)
            Data.append("type",AddWatch.type)
            Data.append("description",AddWatch.description)
            Data.append("price",AddWatch.prix)
            Data.append("picture",AddWatch.pic)
            Data.append("qte",AddWatch.qte)
            axios.post("http://localhost/MY_PROJECTS/cosmetic/product.php",Data).then((res)=>{
                if (res.data) {
                    toast.success("Your Annouce is succesfuly added !!");
                    // setcount(count === 0 ? 1 : 0);
                    navigate("/Products");
                }
            })
          }
      } 

  return (

    <>
        <form className='w-[90%] flex gap-5 flex-col items-center relative left-1/2 -translate-x-1/2 mt-10 pb-4' onSubmit={Addproduct}>
            <h1 className='text-green-800 font-bold text-[20px] md:text-[30px] text-center'>Add New Product</h1>
            <nav className='grid grid-cols-1 gap-3 w-[90%] place-items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                    <label htmlFor="">Nom</label>
                    <input type="text" name='Nom' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh ' onChange={InputChange} placeholder="Nom" />
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                    <label htmlFor="">Type</label>
                    <select name="type"  className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh ' onChange={InputChange}>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="enfant">Enfant</option>
                        <option value="mix">Mix</option>
                    </select>
                </div>
            </nav>
            <div className='flex flex-col items-center gap-2 w-[90%]'>
                <input name="qte" type="number" placeholder='Qte' id="" className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh w-[80%]' onChange={InputChange}/>
            </div>
            <div className='flex flex-col items-center gap-2 w-[90%]'>
                <textarea name="description" placeholder='Description' id="" className='min-h-20 max-h-32 pt-2 rounded-md focus:outline-none pl-2 bg-transparent sh w-[80%]' onChange={InputChange}></textarea>
            </div>
            <nav className='grid grid-cols-1  gap-3 w-[90%] place-items-center'>
                <div className='flex flex-col gap-2 w-[80%]'>
                    <label htmlFor="">Price</label>
                    <input type="number" name='prix' placeholder='En DH' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh ' onChange={InputChange}/>
                </div>
                <div className='flex flex-col gap-2 w-[80%]'>
                    <label htmlFor="">Picture</label>
                    <input type="file" name='pic' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent  ' onChange={InputChange}/>
                </div>
            </nav>
            <div className='w-[80%] pl-10'>
            <button type='submit' className='w-[120px] h-9 rounded-md sh bg-white text-yellow-900 duration-500 transition-all hover:text-white hover:bg-yellow-900 self-start'>Ajouter</button>
            </div>
        </form>
    </>
  )
}

export default Add