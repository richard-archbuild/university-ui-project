import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Background from "./Images/pexels-tima-miroshnichenko-6169056.jpg"
import ButtonComponent from "./ButtonComponent";

export default function Drivers(){
const navigate = useNavigate();

    const [vehicleChanged,setVehicleChanged] = useState(false)
    const [drivers,setDrivers] = useState([])
    const [selectedDriver,setSelectedDriver] = useState([])  
    const [availableVehicles,setAvailableVehicles] = useState([])
    const [selected,setSelected] = useState(false)
    const [selectedIndex,setSelectedIndex] = useState()


    const updateValues = async(index)=>{

    const valueForOldVehicle ={
      Status:"Unassigned",
      License_Plate:drivers[index].Vehicle_noPlate
    }

    const valueForNewVehicle ={
      Status:"Assigned",
      License_Plate:selectedDriver.Vehicle_noPlate
    }

      if(vehicleChanged === true)
        {
          await axios.put("http://localhost:8800/add-driver",valueForOldVehicle)
          await axios.put("http://localhost:8800/add-driver",valueForNewVehicle)
        }

    try{
    await axios.put("http://localhost:8800/update-driver",selectedDriver).then((response)=>{console.log(response.data)})
    }
    catch(err){console.log(err)}
    }



useEffect(()=>{
        const fetchAllUnassignedVehicles = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/vehicles2")
                setAvailableVehicles(res.data);
                console.log(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllUnassignedVehicles();
},[])

    useEffect(()=>{
        const fetchAllDrivers = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/drivers")
                setDrivers(res.data);
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllDrivers();
    },[])
    
const tableStyle = {

  width: '80%',
  borderCollapse: 'collapse',
  marginLeft:60,
  marginTop:20,
};
 const rowStyle = (index) => ({
        backgroundColor: index % 2 === 0 ? '#2c2c2c' : 'gray', // Alternating colors
  });
  
const thStyle = {
  backgroundColor: 'red',
  fontSize:20,
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  borderBottom: '2px solid red',
};

const tdStyle = {
  padding: '10px',
  color:"#CDCDCD",
  borderBottom: '1px solid red',
  textAlign:'center'
};

const tableHeaderStyle = {
  color: 'white',
  backgroundColor: 'red',
  padding: '10px',
  borderBottom: '2px solid white',
};

const handleChange = (index,e) =>{
    setSelectedIndex(index)
    setSelected(true)
    setSelectedDriver((prev)=>({...drivers[index],...prev,[e.target.name]:e.target.value}))
    console.log(selectedDriver)

    selectedDriver.Vehicle_noPlate === drivers[index].Vehicle_noPlate ? setVehicleChanged(false) : setVehicleChanged(true)
    }

const selectStyle = {
    backgroundColor: '#2C2C2C', // Red background
    color: '#CDCDCD',           // Black text
    border: '1px solid #000000', // Black border
    borderRadius: '2px',        // Rounded corners
    paddingLeft: '8px',        // Padding inside the select box
    width:100,
    fontSize: '12px',           // Font size
    marginLeft:20,
    height:40,
    alignContent:"right"
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
        right:0,
        zIndex:1,
        }}>
         <div style={{
            position:"absolute",
            top:0,
            bottom:0,
            left:0,
            right:0,
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            zIndex:-2
         }}/>
        
            <h1 style={{color:"white",textAlign:"center"}}>Drivers Page</h1>

        <div className="Drivers" style={{overflow:"scroll",height:300}}>
            <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
                <th style={thStyle}>System ID</th>
                <th style={thStyle}>First Name</th>
                <th style={thStyle}>Last Name</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>License Number</th>
                <th style={thStyle}>Number Plate</th>
                <th style={thStyle}>Edit</th>
            </thead>
            <tbody>
        {drivers.map((driver,index)=>(
            <tr key={driver.Driver_ID} style={rowStyle(index)}>
                <td style={tdStyle}><input style={selectStyle} onChange={(e)=>{handleChange(index,e)}} name="Driver_ID" placeholder={driver.Driver_ID}/></td>
                <td style={tdStyle}><input style={selectStyle} onChange={(e)=>{handleChange(index,e)}} name="Driver_fname" placeholder={driver.Driver_fname}/></td>
                <td style={tdStyle}><input style={selectStyle} onChange={(e)=>{handleChange(index,e)}} name="driver_lname" placeholder={driver.driver_lname}/></td>
                <td style={tdStyle}><input style={selectStyle} onChange={(e)=>{handleChange(index,e)}} name="driver_phone_no" placeholder={driver.driver_phone_no}/></td>
                <td style={tdStyle}><input style={selectStyle} onChange={(e)=>{handleChange(index,e)}} name="license_no" placeholder={driver.license_no}/></td>
                <td style={tdStyle}>
                  <select 
                    style={selectStyle} 
                    onChange={(e)=>{handleChange(index,e)}}
                    name="Vehicle_noPlate"
                    placeholder={driver.Vehicle_noPlate}>
                  
                    <option value={driver.Vehicle_noPlate}>{driver.Vehicle_noPlate}</option>
                      {availableVehicles.map((vehicle,index) =>(
                        <option value={vehicle.License_Plate} key={vehicle.License_Plate}>{vehicle.License_Plate}</option>
                        ))
                      }

                  </select>

                </td>
                <td style={tdStyle}>{selectedIndex === index && selected?<button onClick={()=>{updateValues(index)}}><FaCheck size={20} color="red"/></button>:<p/>}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
        <div style={{marginTop:20,position:"absolute",right:120}}>
        <ButtonComponent onClick={()=>{navigate("/add-driver")}} label={"Add Driver"}/>
        </div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:60,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
        </div>
    )
}
