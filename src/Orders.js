import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Background from "./Images/pexels-tiger-lily-4481534.jpg"
import ButtonComponent from "./ButtonComponent";
export default function Orders(){
    const [orders,setOrders]= useState([]);
    const navigate = useNavigate();
 useEffect(()=>{   
const getOrders = async e =>{
    try{
    const res = await axios.get("http://localhost:8800/orderproduct")
    setOrders(res.data)
    console.log(res.data)
    
    }
    catch(err){console.log(err)}
}
getOrders()},[])

const tableStyle = {

  width: '195vh',
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
            <div className="orders">
                <h1 style={{color:"white",textAlign:"center"}}>Orders</h1>
                <table style={tableStyle}>
                    <thead style={tableHeaderStyle}>
                    <th style={thStyle}>Sale ID</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Business Tax Number</th>
                    <th style={thStyle}>Sales Rep ID</th>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Edit</th>
                    </thead>
                {orders.map((order,index) =>(
                <tr style={rowStyle(index)} key={order.orderproduct_id}>
                    <td style={tdStyle}>{order.orderproduct_id}</td>
                    <td style={tdStyle}>{order.total_price}</td>
                    <td style={tdStyle}>{order.business_taxno}</td>
                    <td style={tdStyle}>{order.salesrep_id}</td>
                    <td style={tdStyle}>{order.order_id}</td>
                    <td style={tdStyle}>{order.order_status}</td>
                    <td style={tdStyle}><button onClick={()=>{navigate(`/edit-order/${order.order_id}`)}}> edit</button></td>
                </tr>
               )) }
               </table>
            </div>
            <div style={{position:"absolute",right:120,marginTop:10}}>
            <ButtonComponent onClick={()=>{navigate("/create-order")}} label={"Create New Order"}/>
</div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:60,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
        </div>
    )
}
