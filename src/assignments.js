import React from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import Background from "./Images/pexels-tiger-lily-4483610.jpg"

export default function Assignments(){


const navigate = useNavigate();

const tableStyle = {
  width: '80%',
  borderCollapse: 'collapse',
  marginLeft:20,
  marginTop:20
};

const thStyle = {
  backgroundColor: 'red',
  fontSize:20,
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  borderBottom: '2px solid red',
};

 const rowStyle = (index) => ({
        backgroundColor: index % 2 === 0 ? '#2c2c2c' : 'gray', // Alternating colors
  });
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

const [assignments,setAssignments] = useState([]);
const [checkVisible,setCheckVisible] = useState(false);
const [selectedIndex,setSelectedIndex] = useState();
const [changeAssignments,setChangeAssignments] = useState([]);

    useEffect(()=>{
        const fetchAllAssignments = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/assignments")
                setAssignments(res.data)
                console.log(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllAssignments();
    },[])

const handleChange = (index,e) =>{
  setSelectedIndex(index)
  setCheckVisible(true)
  setChangeAssignments((prev)=>({...assignments[index],...prev, [e.target.name]:e.target.value}))
  console.log(changeAssignments)
  }

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
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            zIndex:-2
         }}/>
        <div className="Assignments" style={{height:400,overflow:"scroll",width:'200vh',marginLeft:80,marginTop:50 }}>
            <h2 style={{textAlign:"center",color:"white"}}>Assignments</h2>
            <table style={tableStyle}>
                <thead style={tableHeaderStyle}> 
                
                    <th style={thStyle}>Assignment ID</th>
                    <th style={thStyle}>Business Tax Number</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Driver ID</th>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Creation Date</th>
                    <th style={thStyle}>Edit</th>
                
                </thead>
                <tbody >
            {assignments.map((assignment,index)=>(
                    <tr style={rowStyle(index)} key={assignment.idAssignments}>
                    <td style={tdStyle}><input placeholder={assignment.idAssignments} name="idAssignments" onChange={(e)=>{handleChange(index,e)}} /> </td>
                    <td style={tdStyle}><input placeholder={assignment.Business_TaxNo} name="Business_TaxNo" onChange={(e)=>{handleChange(index,e)}} /></td>
                    <td style={tdStyle}><input placeholder={assignment.Status} name="Status" onChange={(e)=>{handleChange(index,e)}} /></td>
                    <td style={tdStyle}><input placeholder={assignment.Driver_ID} name="Driver_ID" onChange={(e)=>{handleChange(index,e)}} /></td>
                    <td style={tdStyle}><input placeholder={assignment.Order_ID} name="Order_ID" onChange={(e)=>{handleChange(index,e)}} /></td>
                    <td style={tdStyle}><input placeholder={assignment.AssignmentCreated} name="AssignmentCreated" /></td>
                    <td style={tdStyle}>{selectedIndex === index && checkVisible?<FaCheck color="red" size={20}/>:<p/>}</td>
                    </tr>
            ))}
            </tbody>
            </table>
        </div>
        <div style={{position:"absolute",marginTop:20,right:120}}>
        <ButtonComponent label={"create assignment"} onClick={()=>{navigate("/create-assignment")}}/>
        </div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:60,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
        </div>
    )
}
