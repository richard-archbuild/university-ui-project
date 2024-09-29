import React, { useState } from "react";
import Background from "./Images/pexels-tima-miroshnichenko-6169056.jpg"
import logo from "./Images/0000803_logo_black.png"
import ButtonComponent from "./ButtonComponent";
import { Link } from "react-router-dom";

export default function Login(){
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    
    const usernameChange = (e) =>{
    setUsername(e.target.value)
    console.log(username);
};
    const passwordChange = (e) =>{
    setPassword(e.target.value)
    console.log(password);
};

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
        width:"100%",
        right:0,
        zIndex:1,
        }}>
         <div style={{
            position:"absolute",
            top:0,
            bottom:0,
            left:0,
            right:0,
            backgroundColor: 'rgba(52, 52, 52, 0.7)',
            zIndex:-2,
         }}/>

        <div style={{position:"absolute",left:575,top:200}}>
            <div><img src={logo} alt="logo"/></div>
            <div style={{display:"flex",flexDirection:"row",marginLeft:10}}>
                <p style={{color:"#CDCDCD"}}>User Name:</p> <input style={{marginLeft:20,backgroundColor:"#2D2D2D",borderWidth:0,color:"#CDCDCD"}} placeholder="username" onChange={usernameChange}/>  <style> 
                {` 
                    ::placeholder { 
                        color: #CDCDCD; 
                    }` 
                } 
            </style> 
            </div>
            <div style={{display:"flex",flexDirection:"row",marginTop:10,marginLeft:10}}>
                <p style={{color:"#CDCDCD"}}>Password:</p> <input type="password" onChange={passwordChange} style={{marginLeft:30,backgroundColor:"#2D2D2D",borderWidth:0,color:"#CDCDCD"}}  placeholder="password"/> <style> 
                {` 
                    ::placeholder { 
                        color: #cdcdcd; 
                    }` 
                } 
            </style> 
            </div>
            <Link to={`/homescreen/${username}`}>
            <div style={{marginLeft:130,marginTop:10}}><ButtonComponent label={"Login"}/></div>
            </Link>

        
        </div>
        </div>
    )
}