import axios from "axios";
import driverStyles from "./AddDriverStyles.js";
import React, { useState } from "react";
import Background from "./Images/pexels-tima-miroshnichenko-6169056.jpg"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export default function AddDriver(){
    const [finalized,setFinalized] = useState(false)
    const [vehicles,setVehicles] = useState([])
    const navigate = useNavigate();
    const [addDriver,setAddDriver] = useState({
        Driver_fname:"",
        driver_lname:"",
        driver_phone_no:"",
        license_no:"",
        Vehicle_noPlate:"",
        
})
const handleChange = (e) =>{
    setAddDriver(prev=>({...prev, [e.target.name]:e.target.value}))
    console.log(addDriver);
};

useState(()=>{
        const fetchAllUnassignedVehicles = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/vehicles2")
                setVehicles(res.data);
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllUnassignedVehicles();
},[])

const handleClick = async e =>{
    setFinalized(true)
    const updatedvehicle ={
        Status:"Assigned",
        License_Plate:addDriver.Vehicle_noPlate,
    }
    e.preventDefault()
    try{
        await axios.post('http://localhost:8800/drivers',addDriver);
            
        await axios.put('http://localhost:8800/add-driver',updatedvehicle).then(function (response) {
            console.log(response.data);
        
        })
;
        
    }
    catch(err){
        console.log(err)
    }
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
         <div style={driverStyles.blackout}/>
            <div style={{
            marginLeft:20,
            marginTop:40
            }}>
                <div style={{display:"flex",flexDirection:"column",width:"20%"}}>
            <h1 style={{color:"white"}}>Add New Driver</h1>
            <input type="text" style={driverStyles.textinput} placeholder="First Name"  onChange={handleChange} name="Driver_fname"/>
            <input type="text"  style={driverStyles.textinput} placeholder="Last Name"    onChange={handleChange}name="driver_lname"/>
            <input type="text"  style={driverStyles.textinput} placeholder="Phone Number" onChange={handleChange}name="driver_phone_no"/>
            <input type="text"  style={driverStyles.textinput} placeholder="License No"  onChange={handleChange} name="license_no"/>
            <select  style={{marginTop:10,marginBottom:10,backgroundColor:"#2C2C2C",color:"#CDCDCD"}}  onChange={handleChange} name="Vehicle_noPlate">
                {vehicles.map((vehicle,index) =>(
                    <option value={vehicle.License_Plate} key={vehicle.License_Plate}>{vehicle.License_Plate}</option>
                ))

                }
            </select>
            </div>
            </div>
            <div style={{marginLeft:20,marginTop:10}}>
            <ButtonComponent onClick={handleClick} label={"Create New Driver"} />
          {finalized? <p style={{marginLeft:10,color:"white"}}>Driver Has Been Created</p>:<p/>}   
            </div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:20,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
        </div>
    )
}
