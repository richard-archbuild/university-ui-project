import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState} from "react";
import { useLocation } from "react-router-dom";
import Background from "./Images/pexels-olly-3806252.jpg"
import ButtonComponent from "./ButtonComponent";

export default function EditProduct(){
const location = useLocation()
const prodID = location.pathname.split("/")[2]
const [label,setLabel] = useState(false)
const navigate = useNavigate()
    
const [products, setProducts] = useState([])
    
    
        const handleClick = async e=>{
            setLabel(true)
            try{
            await axios.put("http://localhost:8800/products/"+prodID, products).then(function(response){
                console.log(response)
            }) 
                }
            catch(err){console.log(err)}

        }

    const handleChange = (e) =>{
    setProducts(prev=>({...prev, [e.target.name]:e.target.value}))
    console.log(products);
};

const inputStyle ={ 
    backgroundColor:"#2C2C2C",
    height:38,
    color:"#CDCDCD"
}

    return(
        
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

           <div style={{marginTop:50}}>
            <input style={inputStyle} type="text" placeholder="Brand"  onChange={handleChange} name="brand"/>
            <input  style={inputStyle} type="text" placeholder="Product Name"    onChange={handleChange}name="product_name"/>
            <input  style={inputStyle} type="text" placeholder="Product Count" onChange={handleChange}name="product_count"/>
            <input  style={inputStyle} type="text" placeholder="Price"  onChange={handleChange} name="price"/>
            <input  style={inputStyle} type="text" placeholder="Tyre Type"  onChange={handleChange} name="product_type"/>
            <ButtonComponent onClick={handleClick} label={"Edit Product"}/>
            </div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:20,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
            {label?<p style={{marginLeft:0,color:"white"}}>Product has been edited</p>:<p></p>}

        </div>
    )
}
