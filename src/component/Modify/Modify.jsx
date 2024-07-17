import React from 'react'
import { useContext } from 'react';
import { Data } from '../../context/watch';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Modify = () => {
  let {id} = useParams()
  let navigate = useNavigate()
  let {Handlechange,Formconfirmation,AllProducts} = useContext(Data)
  let [clicked,setclicked] = useState(()=>{
    const item = AllProducts.filter((watch)=>parseInt(watch.Id) === parseInt(id))[0]
    return item
  })
  // this usestate it's for one input (image)
  let [new_pic,setnew_pic] = useState({
    picture : ""
  })
  const new_pic_change = (event)=>{
      Handlechange(event,setnew_pic,new_pic)
  }
  let [Modify,setModify] = useState({
      Nom : clicked.Nom,
      type : clicked.Type,
      description : clicked.Description,
      prix : clicked.Price,
      old_pic : clicked.Pic,
      qte : clicked.qte
  })
  // this function for handle change
  const InputChange = (event)=>{
      Handlechange(event,setModify,Modify)
    }
    // this function for createaccount confirmation
    const Modifyproduct = (event)=>{
        event.preventDefault();
        if (Formconfirmation(Modify) === 6) {
          const Data = new FormData()
          Data.append("name",Modify.Nom)
          Data.append("type",Modify.type)
          Data.append("description",Modify.description)
          Data.append("price",Modify.prix)
          Data.append("old_pic",Modify.old_pic)
          Data.append("qte",Modify.qte)
          Data.append("picture",new_pic.picture)
          axios.post(`http://localhost/MY_PROJECTS/cosmetic/product.php?update=${id}`,Data).then((res)=>{ 
                toast.success("Your Annouce is succesfuly added !!");
                navigate("/Products");
          })
        }
    } 

return (

  <>
      <form className='w-[90%] flex gap-5 flex-col items-center relative left-1/2 -translate-x-1/2 mt-10 pb-4' onSubmit={Modifyproduct}>
          <h1 className='text-yellow-700 font-bold text-[20px] md:text-[30px] text-center'>Modifier Produit</h1>
          <nav className='grid grid-cols-1 gap-3 w-[90%] place-items-center'>
              <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="">Nom</label>
                  <input type="text" value={Modify.Nom} name='Nom' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh ' onChange={InputChange} placeholder="Nom" />
              </div>
              <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="">Type</label>
                  <select name="type"  className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh ' onChange={InputChange}>
                      <option value={Modify.type}>{Modify.type}</option>
                     
                  </select>
              </div>
          </nav>
          <div className='flex flex-col items-center gap-2 w-[90%]'>
              <input name="qte" value={Modify.qte} placeholder='Quantite' id="" className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh w-[80%]' onChange={InputChange}/>
          </div>
          <div className='flex flex-col items-center gap-2 w-[90%]'>
              <textarea name="description" value={Modify.description} placeholder='Description' id="" className='min-h-20 max-h-32 pt-2 rounded-md focus:outline-none pl-2 bg-transparent sh w-[80%]' onChange={InputChange}></textarea>
          </div>
          <nav className='grid grid-cols-1  gap-3 w-[90%] place-items-center'>
              <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="">Price</label>
                  <input type="number" value={Modify.prix} name='prix' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent sh ' onChange={InputChange}/>
              </div>
              <div className='flex flex-col gap-2 w-[80%]'>
                  <label htmlFor="">Picture</label>
                  <input type="file" name='picture' className='h-10 rounded-md focus:outline-none pl-2 bg-transparent' onChange={new_pic_change}/>
              </div>
              {/* this input throught it i will hide the previous pic  */}
              <input type="hidden" name='old_pic' value={Modify.old_pic} onChange={InputChange}/>
          </nav>
          <div className='w-[80%] pl-10'>
          <button type='submit' className='w-[120px] h-9 rounded-md sh bg-white text-yellow-700 duration-500 transition-all hover:text-white hover:bg-yellow-700 self-start'>Modifier</button>
          </div>
      </form>
  </>
)
}

export default Modify