import React from 'react'
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import { useContext } from 'react';
import { Data } from '../../context/watch';
import axios from 'axios';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Message = () => {
  let {setContact,Contact} = useContext(Data)
  const handledelete = (id)=>{
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this message',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>  {
            axios.delete(`http://localhost/MY_PROJECTS/cosmetic/product.php?type=message&item=${id}`).then((res)=>{
              toast.success("your message is successfuly deleted")
            })
          }
        },
        {
          label: 'No',
          onClick: () => ""
        }
      ]
    });
   
  }
  return (
    <>
    <section className='mt-20 relative left-1/2 -translate-x-1/2 w-[90%]'>
    {
      Contact.length !== 0 ? 
      <table className='mt-10 w-[90%] relative left-1/2 -translate-x-1/2'>
          <tr>
            <th className='border border-yellow-700 text-black font-bold text-center h-10'>Id</th>
            <th className='border border-yellow-700 text-black font-bold text-center h-10'>User Name</th>
            <th className='border border-yellow-700 text-black font-bold text-center h-10'>Email</th>
            <th className='border border-yellow-700 text-black font-bold text-center h-10'>Message</th>
            <th className='border border-yellow-700 text-black font-bold text-center h-10'></th>
          </tr>

          {
            Contact.map((msg)=>{
              return(
                <>
                  <tr key={msg.Id}>
                    <td className='border border-yellow-700 text-black font-bold text-center h-12'>{msg.Id}</td>
                    <td className='border border-yellow-700 text-black font-bold text-center h-12'>{msg.Nom}</td>
                    <td className='border border-yellow-700 text-black font-bold text-center h-12'>{msg.Email}</td>
                    <td className='border border-yellow-700 text-black font-bold text-center h-12'>{msg.Msg}</td>
                    <td className='border border-yellow-700 text-black font-bold text-center h-12 flex justify-center items-center'><button className='w-[100px] h-10 text-sm rounded-md sh bg-white text-yellow-700 duration-500 transition-all hover:text-white hover:bg-yellow-700 flex items-center justify-center gap-3' onClick={()=>handledelete(parseInt(msg.Id))}><MdDelete /> Delete</button></td>    
                  </tr>
                </>
              )
            })
          }
        </table> : <><p className='text-yellow-700 text-center '>No Message Yet !!</p></>
    }
    </section>
    </>
  )
}

export default Message