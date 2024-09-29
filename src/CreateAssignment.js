import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "./Images/pexels-tiger-lily-4483610.jpg"
import ButtonComponent from "./ButtonComponent";


export default function CreateAssignment(){

    const [finalized,setFinalized]= useState(false)
    const navigate = useNavigate();

const selectStyle = {
    backgroundColor: '#2C2C2C', // Red background
    color: '#CDCDCD',           // Black text
    border: '1px solid #000000', // Black border
    borderRadius: '2px',        // Rounded corners
    paddingLeft: '8px',        // Padding inside the select box
    width:400,
    fontSize: '16px',           // Font size
    marginLeft:20,
    height:40,
    alignContent:"right"
  };

  // Styles for the wrapper to ensure custom styles are visible
  const wrapperStyle = {
    display:"flex",
    flexDirection:"row",
       // Inline-block display to fit content
    margin:10,
    alignItems:"center"
  };


    const [getDrivers,setGetDrivers] = useState([]);
    const [getOrders,setGetOrders] = useState([]);
    const [selectedDriver,setSelectedDriver] = useState([]);
    const [selectedOrder,setSelectedOrder] = useState([]);
   
    const [assignmentDetails,setAssignmentDetails] = useState({
        Business_TaxNo:"", 
        Warehouse_ID:"", 
        Driver_ID:"", 
        Order_ID:"", 
        AssignmentCreated:""
});

    useEffect(()=>{
        const fetchAllOrders = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/orderproduct2")
                setGetOrders(res.data)
                console.log(res.data)
            }
            
            catch(err){
                console.log(err)
            }
        }
        fetchAllOrders();
    },[])

    useEffect(()=>{
        const fetchAllDrivers = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/drivers")
                setGetDrivers(res.data)
            }
            catch(err){console.log(err)}
        }
        fetchAllDrivers();
    },[])

    const handleDriverChange = (event) =>{ 
        const index = event.target.value
        setSelectedDriver(getDrivers[index])
    }

    const handleOrderChange = (e) =>{
        const index = e.target.value
        setSelectedOrder(getOrders[index])
        console.log(selectedOrder)

    }

    const handleClick = async e =>{
        const finalassdetails = {
            Business_TaxNo:selectedOrder.business_taxno,
            Status:"Processing",
            Driver_ID:selectedDriver.Driver_ID,
            Order_ID:selectedOrder.orderproduct_id,
            AssignmentCreated:'2024-09-13'
        }
        setFinalized(true)
        const updatedOrder={
            order_status:"Assigned",
            orderproduct_id:finalassdetails.Order_ID
        }
        setAssignmentDetails(finalassdetails)
        console.log(assignmentDetails)
    e.preventDefault()
  try{
        await axios.post('http://localhost:8800/assignments',finalassdetails);
        await axios.put('http://localhost:8800/update-order', updatedOrder);
        
    
    }
    catch(err){
        console.log(err)
    }
};

    return(
        
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
            <h1 style={{fontWeight:"bold",color:"white",marginLeft:20,marginTop:50}}>Create New Assignment</h1>
        <div className="getDrivers" style={wrapperStyle}>
            <h3 style={{color:"white",fontWeight:"bold",fontSize:20,marginLeft:10,textAlign:"right"}}>Driver:</h3>
            <select onChange={handleDriverChange}  defaultValue={0}style={{...selectStyle,marginLeft:18}}>
            {getDrivers.map((driver,index)=>(
                <option value={index} key={driver.Driver_ID} >{driver.Driver_fname} {driver.driver_lname}</option>
            ))}
            </select>
        </div>
        
        <div className="getOrders" style={wrapperStyle} >
            <h3 style={{marginLeft:10,color:"white",fontWeight:"bold",fontSize:20,textAlign:"right"}}>Order:</h3>
            <select  onChange={handleOrderChange} defaultValue={0} style={selectStyle}>
            {getOrders.map((orderproduct, index)=>(
                <option  value={index} key={orderproduct.orderproduct_id}>
                    ID: {orderproduct.orderproduct_id} {"\n"} Business Tax Number: {orderproduct.business_taxno}
                    </option>
            ))}
            </select>
        </div>

        <div style={{marginLeft:10}}><ButtonComponent onClick={handleClick} label={"Create Assignment"}/></div>
          {finalized? <p style={{marginLeft:10,color:"white"}}>Assignment Has Been Created</p>:<p/>}   
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:20,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
        </div>
    )
}