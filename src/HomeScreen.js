import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import Background from "./Images/pexels-marcin-jozwiak-199600-2800121.jpg"
import { IoDocumentOutline } from "react-icons/io5";
import { TbSteeringWheel } from "react-icons/tb";
import { PiTire } from "react-icons/pi";
import { PiPackageDuotone } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { HiOutlineDocumentReport } from "react-icons/hi";



export default function HomeScreen() {

    const navigate = useNavigate();

    const location = useLocation();
    const loginID = location.pathname.split("/")[2]
    const [color1,setColor1] = useState("white")
    const [color2,setColor2] = useState("white")
    const [color3,setColor3] = useState("white")
    const [color4,setColor4] = useState("white")
    const [color5,setColor5] = useState("white")
    
    return(
        <div>
        <div style={{  
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
        }}/>
         <div style={{
            position:"absolute",
            top:0,
            bottom:0,
            left:0,
            right:0,
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            zIndex:2
         }}/>

         <div style={{zIndex:3,position:"absolute",top:"40%",left:"25%"}}>
            
            {loginID === "Admin"|| loginID ==="WStaff"?
            <button onMouseLeave={()=>{setColor1("white")}} onMouseEnter={()=>{setColor1("red")}} onClick={()=>{navigate("/assignments")}} style={{marginLeft:20,marginRight:40,borderWidth:0,backgroundColor:"rgba(0,0,0,0)",zIndex:3}}>
                <IoDocumentOutline size={100} color={color1}/>
                <p style={{textAlign:"center",color:`${color1}`,fontWeight:"bold",fontSize:15}} >Assignments</p>
            </button> :<p></p>}

                {loginID ==="Admin"|| loginID ==="WStaff"?
            <button  onMouseLeave={()=>{setColor2("white")}} onMouseEnter={()=>{setColor2("red")}} onClick={()=>{navigate("/drivers")}} style={{marginLeft:20,marginRight:40,borderWidth:0,backgroundColor:"rgba(0,0,0,0)",zIndex:3}}>
                <TbSteeringWheel size={100} color={color2}/>
                <p style={{textAlign:"center",color:`${color2}`,fontWeight:"bold",fontSize:15,marginLeft:10}} >Drivers</p>
            </button>:<p></p>}
            
            {loginID ==="Admin" || loginID ==="WStaff"?
            <button  onMouseLeave={()=>{setColor4("white")}} onMouseEnter={()=>{setColor4("red")}} onClick={()=>{navigate("/prodfinal")}} style={{marginLeft:20,marginRight:20, borderWidth:0,backgroundColor:"rgba(0,0,0,0)",zIndex:3}}>
                <PiTire size={100} color={color4}/>
                <p style={{textAlign:"left",color:`${color4}`,fontWeight:"bold",fontSize:15,marginLeft:25}} >Products</p>
            </button> :<p></p>}

            {loginID ==="Admin" || loginID ==="WStaff"?
            <button  onMouseLeave={()=>{setColor5("white")}} onMouseEnter={()=>{setColor5("red")}} onClick={()=>{navigate("/reports")}} style={{marginLeft:20,marginRight:20, borderWidth:0,backgroundColor:"rgba(0,0,0,0)",zIndex:3}}> 
                <HiOutlineDocumentReport size={100} color={color5}/>
                <p style={{textAlign:"left",color:`${color5}`,fontWeight:"bold",fontSize:15,marginLeft:25}} >Reports</p>
            </button> : <p></p>}

                {loginID === "Admin" || loginID ==="RJ0042"?
            <button  onMouseLeave={()=>{setColor3("white")}} onMouseEnter={()=>{setColor3("red")}} onClick={()=>{navigate("/orders")}} style={{marginLeft:20,marginRight:40,borderWidth:0,backgroundColor:"rgba(0,0,0,0)",zIndex:3}}>
                <PiPackageDuotone size={100} color={color3}/>
                <p style={{textAlign:"center",color:`${color3}`,fontWeight:"bold",fontSize:15,marginLeft:15}} >Orders</p>
            </button>: <p></p>}


        </div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:20,zIndex:2}} > <ButtonComponent label={"Logout"}/> </Link>

        </div>
    ) 
}

    
    
    
