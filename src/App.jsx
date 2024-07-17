import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route, useLocation, useNavigate} from "react-router-dom"
import Add from './component/AddWatch/Add'
import All from './component/Allwatches/All'
import Order from './component/Order/Order'
import Message from './component/Messages/Message'
import Modify from './component/Modify/Modify'
import Header from './component/Header/Header'
import { Data } from './context/watch'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'
import Auth from './component/auth/Auth'
import CryptoJS from 'crypto-js';

function App() {
  let navigate = useNavigate()
  let location = useLocation()
  // this useeffect for handling autorization
  useEffect(()=>{
    if (window.sessionStorage.getItem("token")) {
      const Id = window.sessionStorage.getItem("token");
      const decypte = decryptId(Id,secretKey)
      try{
        axios.get(`http://localhost/MY_PROJECTS/cosmetic/auth.php?id=${decypte}`).then((res)=>{
          if (res.data === 0) {
            navigate("/Auth");
            toast.error("password or email are incorrect !! try again")
          }
        })
      }catch{
        toast.error("a server problem please try again !!")
        navigate('/Auth')
      }
    } else {
      navigate("/Auth")
    }
  },[location.pathname])
  // this usestate will contain the product data
  const [AllProducts,setALLProducts] = useState(()=>{
    const data = JSON.parse(window.sessionStorage.getItem("data"))
    return data ? data : []
  })
  // this usestate will contain the order
  const [Orders,setOrders] = useState([])
  // this usestate will contain the message
  const [Contact,setContact] = useState([])
  // this secrekey for doing authentification
  const secretKey = "12AZ34ER56TY"
  // for encrypt the id comming from database
  const encryptId = (id, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
  return encrypted;
  };

  // function for decypte the id from session storage

  const decryptId = (encrypted, secretKey) => {
    const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };
  
  // this function for confirming  all fields that are not empty in a specific form
  const Formconfirmation = (formData)=>{
    let check = 0
      Object.keys(formData).map((input)=>{
          let current = formData[input]
          if (current === "") {
              toast.error(`the ${input} field is required`)
          }else{
              check++
          }
      })
    return check
  }
  // this function for handling change for inputs field
  const Handlechange = (event,setFormData,FormData)=>{
    let {tagName,name,value}  = event.target
    // handle the input type 
    if (tagName === "INPUT") {
      let {type} = event.target
      if (type !== "file") {
        setFormData({...FormData,[name]:value}) 
      }else{
          let {files} = event.target
          setFormData({...FormData,[name]:files[0]})
      }
    }else{
      setFormData({...FormData,[name]:value})
    }
  }
  // this useeefect it's for get the data from database every 3 second 

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [productsRes, ordersRes, messagesRes] = await Promise.all([
                axios.get("http://localhost/MY_PROJECTS/cosmetic/product.php"),
                axios.get("http://localhost/MY_PROJECTS/cosmetic/Order.php"),
                axios.get("http://localhost/MY_PROJECTS/cosmetic/Contact.php"),
            ]);
            window.sessionStorage.setItem("data",JSON.stringify(productsRes.data))
            setALLProducts(productsRes.data);
            setOrders(ordersRes.data);
            setContact(messagesRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    const intervalId = setInterval(fetchData, 3000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <Data.Provider value={{Handlechange,Formconfirmation,AllProducts,setALLProducts,setOrders,Orders,setContact,Contact,secretKey,encryptId,decryptId}}>
    <Toaster position="top-right" reverseOrder={false} />
      {
        location.pathname !== "/Auth" ? <Header /> : <></>
      }
      <Routes>
        <Route index element={<Add />} />
        <Route path='/Products' element={<All />} />
        <Route path='/Orders' element={<Order />} />
        <Route path='/Messages' element={<Message />} />
        <Route path='/Modify/:id' element={<Modify />} />
        <Route path='/Auth' element={<Auth />} />
      </Routes>
    </Data.Provider>
    </>
  )
}

export default App
