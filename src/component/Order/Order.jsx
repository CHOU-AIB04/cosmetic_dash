import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import curren from "../../assets/curren1.png"
import { Data } from '../../context/watch';
import { format } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Order = () => {
    let {setOrders,Orders} = useContext(Data)
   const handledelete = (id,qte,prod)=>{
    console.log(prod)
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this order?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                axios.delete(`http://localhost/MY_PROJECTS/cosmetic/Order.php?type=order_details&item=${id}&qte=${qte}&prod=${prod}`).then((res)=>{
                    toast.success("you order is sucessfuly deleted")
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
   const commande_date = new Date();
  const format_day = format(commande_date,"yyyy-MM-dd");
  return (
  <>
  {
    Orders.length !== 0 ?
    <section className='mt-20 w-[95%] relative left-1/2 -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 place-items-center gap-2'>
        {
            Orders.map((order)=>{
                return(
                    <>
                        <nav className='w-[80%] h-auto relative flex flex-col gap-3 items-center rounded-md sh pb-2' key={parseInt(order.order_id)}>
                            {
                                format_day === order.Date ? <p className='w-[40px] h-[40px] rounded-full bg-green-700 text-white absolute top-0 left-0 flex justify-center items-center text-sm font-bold'>New</p> :<></>
                            }
                            <div className='w-[200px] flex justify-center'>
                                <img src={`http://localhost/MY_PROJECTS/cosmetic/assets/${order.Pic}`} alt="watch" className=' h-[200px] mix-blend-multiply transition-all duration-300 hover:scale-105 cursor-pointer'/>
                            </div>
                            <div className='space-y-3'>
                                <div className='flex items-start lg:items-center flex-col lg:flex-row gap-2 xl:gap-5  text-sm xl:text-[16px]'>
                                    <p className='font-bold'>Product Name : <span className='text-yellow-500'>{order.Nom}</span></p>
                                    <p className='font-bold'>Client Name : <span className='text-yellow-500'>{order.Nom_client}</span></p>
                                    
                                </div>
                               
                                <div className='flex items-start lg:items-center flex-col lg:flex-row gap-2 xl:gap-5 text-sm xl:text-[16px]'>
                                    <p className='font-bold'>Phone : <span className='text-yellow-500'>{order.Tel}</span></p>
                                    <p className='font-bold'>Date Commande : <span className='text-yellow-500'>{order.Date}</span></p>
                                  
                                </div>
                                <div className='flex items-start lg:items-center flex-col lg:flex-row gap-2 xl:gap-5 text-sm xl:text-[16px]'>
                                    <p className='font-bold'>price : <span className='text-yellow-500'>{order.Price}</span> Mad</p>
                                    <p className='font-bold'>Qte : <span className='text-yellow-500'>{order.Qte}</span></p>
                                </div>
                                <p className='font-bold'>Total  : <span className='text-yellow-500'>{parseInt(order.Price)*parseInt(order.Qte)}</span> Mad</p>
                                <div>
                                    <button className='w-[100px] h-10 text-sm rounded-md sh bg-white text-yellow-500 duration-500 transition-all hover:text-white hover:bg-yellow-500 flex items-center justify-center gap-3' onClick={()=>handledelete(parseInt(order.order_id),parseInt(order.Qte),parseInt(order.Id))}><MdDelete /> Supprimé</button>
                                </div>
                            </div>
                        </nav>
                    </>
                )
            })
        }
    </section> 
    : <><p className='text-yellow-500 font-bold text-center text-[30px] mt-10'>No Order Yet !!</p></>
  }
  </>
  )
}

export default Order