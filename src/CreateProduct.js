import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css'
import axios from "axios";
import Background from "./Images/pexels-olly-3806252.jpg"
import ButtonComponent from "./ButtonComponent";



export default function CreateProduct(){
const navigate = useNavigate();
const [newProdData,setNewProdData] = useState([])

const handleChange = (e) =>{
  setNewProdData(prev=>({...prev,[e.target.name]:e.target.value}))
  console.log(newProdData)
  }

const handleClick = async e =>{
    try{
    await axios.post("http://localhost:8800/create-product",newProdData)
    }
    catch(err){console.log(err)}
  }

  return (
   <div style={{  
   alignContent:"center",
   alignItems:"center",
   backgroundImage: `url(${Background})`,
   backgroundPosition: 'center',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',  
   position:"absolute",
   top:0,
   bottom:0,
   left:0,
   right:0,
   zIndex:1,
   paddingTop:20,
   paddingLeft:20
   }}>
    <div style={{
       position:"absolute",
       top:0,
       bottom:0,
       left:0,
       right:0,
       backgroundColor: 'rgba(52, 52, 52, 0.7)',
       zIndex:-2
         }}/>
      
    <div>
      <input name="brand" onChange={handleChange}/>
      <input name="product_type" onChange={handleChange}/>
      <input name="product_count" onChange={handleChange}/>
      <input name="price" onChange={handleChange}/>
      <input name="product_name" onChange={handleChange}/>
      <Popup onClose={()=>{navigate(-1)}} trigger={<span><ButtonComponent onClick={handleClick} label={"Create Product"}  /></span>} position="right center">

        <div>Product has been created</div>
      </Popup>
    </div>

  </div>
  )
}
