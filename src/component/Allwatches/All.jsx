import React from 'react'
import { NavLink } from 'react-router-dom'
import curren from "../../assets/curren1.png"
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useContext } from 'react';
import { Data } from '../../context/watch';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CgDanger } from "react-icons/cg";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import acer from "../../assets/acer.png"
const All = () => {
  let {AllProducts,setALLProducts} = useContext(Data)
  const handedelete =(id)=>{
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure delete this watch?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
            axios.delete(`http://localhost/MY_PROJECTS/cosmetic/product.php?type=product&item=${id}`).then((res)=>{
              toast.success("the product is successfuly deleted");
            })
          }
        },
        {
          label: 'No',
          onClick: () =>""
        }
      ]
    });
    
  }
  return (
    <section className='mt-20 w-[90%] relative left-1/2 -translate-x-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-16 pb-8'>
    {
      AllProducts.length !== 0 ?
      <>
        {
          AllProducts.map((watch)=>{
            return(
              <>
                <nav className='h-[500px] w-[250px]  rounded-md flex flex-col gap-5 pb-2 relative' key={parseInt(watch.Id)}>
                  <NavLink to={`/Modify/${parseInt(watch.Id)}`} className='h-[300px] flex justify-center items-center'>
                      <img src={`http://localhost/MY_PROJECTS/cosmetic/assets/${watch.Pic}`} alt="pic" className=' h-[200px] mix-blend-multiply object-cover duration-500 transition-all hover:scale-110 cursor-pointer'/>
                  </NavLink>
                  <p className='w-[30%] sh  h-[40px] self-center rounded-sm bg-yellow-700 text-sm flex justify-center items-center text-white'>{watch.Type}</p>
                  <div className='flex gap-3 flex-col items-center'>
                    <h1 className='font-bold text-[16px]'>{watch.Nom}</h1>
                    <p className='font-bold text-[20px] text-yellow-700'>{watch.Price} MAD</p>
                  </div>
                  <p className='font-bold self-center flex items-center gap-2'>Quantité : <span className={`${parseInt(watch.qte) <=30 ? "text-red-600" : "text-black"}`}>{watch.qte} unité</span> {parseInt(watch.qte) <=30 ? <CgDanger className='text-red-500' size={20}/> : <></>}</p>
                  <div className='flex items-center gap-4 self-center'>
                    <NavLink to={`/Modify/${parseInt(watch.Id)}`} >
                        <button className='w-[100px] h-10 text-sm rounded-md sh bg-white text-yellow-700 duration-500 transition-all hover:text-white hover:bg-yellow-700 flex items-center justify-center gap-3'><CiEdit/> Modifié</button>
                    </NavLink>
                    <button className='w-[100px] h-10 text-sm rounded-md sh bg-white text-yellow-700 duration-500 transition-all hover:text-white hover:bg-yellow-700 flex items-center justify-center gap-3' onClick={()=>handedelete(parseInt(watch.Id))}><MdDelete /> Supprimé</button>
                  </div>
                </nav>
              </>
            )
          })
        }
      </> : <><p className='text-center text-[30px] text-yellow-700'>No Product yet !!</p></>
    }
   
   </section>
  )
}

export default All