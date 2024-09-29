import { Link, useNavigate } from 'react-router-dom'
import ButtonComponent from './ButtonComponent'
import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios'
import drilldown from 'highcharts/modules/drilldown.js';

export default function Reports(){

const navigate = useNavigate()
const [prodQuery,setProdQuery] = useState([])
const [query2,setQuery2] = useState([])
const [query3,setQuery3] = useState([])
const [queryEarthMovers,setQueryEarthmovers] = useState([])
const [queryIndustrial,setQueryIndustrial] = useState([])
const [queryAgriculture,setQueryAgriculture] = useState([])
const [queryPassenger,setQueryPassenger] = useState([])
const [queryTruck,setQueryTruck] = useState([])
const [querySpentEarthMovers,setQuerySpentEarthmovers] = useState([])
const [querySpentIndustrial,setQuerySpentIndustrial] = useState([])
const [querySpentAgriculture,setQuerySpentAgriculture] = useState([])
const [querySpentPassenger,setQuerySpentPassenger] = useState([])
const [querySpentTruck,setQuerySpentTruck] = useState([])

drilldown(Highcharts)


useEffect(()=>{
const getspenttruck = async ()=>{
	try{
		const res24 = await axios.get("http://localhost:8800/reportsorderedtrucks")
		setQuerySpentTruck(res24.data)
	}
	catch(err){console.log(err)}
	
}
getspenttruck();
},[])

useEffect(()=>{
const getspentpass = async ()=>{
	try{
		const res23 = await axios.get("http://localhost:8800/reportsorderedpassenger")
		setQuerySpentPassenger(res23.data)
    console.log(res23.data)
	}
	catch(err){console.log(err)}
	
}
getspentpass();
},[])

useEffect(()=>{
const getspentagri = async ()=>{
	try{
		const res22 = await axios.get("http://localhost:8800/reportsorderedagri")
		setQuerySpentAgriculture(res22.data)
	}
	catch(err){console.log(err)}
	
}
getspentagri();
},[])

useEffect(()=>{
const getspentearth = async ()=>{
	try{
		const res20 = await axios.get("http://localhost:8800/reportsorderedearthmover")
		setQuerySpentEarthmovers(res20.data)
    console.log(res20.data)
	}
	catch(err){console.log(err)}
	
}
getspentearth();
},[])

useEffect(()=>{
const getspentindust = async ()=>{
	try{
		const res21 = await axios.get("http://localhost:8800/reportsorderedindustrial")
		setQuerySpentIndustrial(res21.data)
	}
	catch(err){console.log(err)}
	
}
getspentindust();
},[])

useEffect(()=>{
const getProdQuery = async ()=>{
	try{
		const res = await axios.get("http://localhost:8800/reports")
		setProdQuery(res.data)
    console.log(res.data)
	}
	catch(err){console.log(err)}
	
}
getProdQuery();
},[])


useEffect(()=>{
const getProdQueryEarthMover = async ()=>{
	try{
		const res5 = await axios.get("http://localhost:8800/reportsearthmoveravailability")
		setQueryEarthmovers(res5.data)
    console.log(res5.data)
	}
	catch(err){console.log(err)}
	
}
getProdQueryEarthMover();
},[])

useEffect(()=>{
const getProdQueryAgri = async ()=>{
	try{
		const res7 = await axios.get("http://localhost:8800/reportsagricultureavailability")
		setQueryAgriculture(res7.data)
	}
	catch(err){console.log(err)}
	
}
getProdQueryAgri();
},[])


useEffect(()=>{
const getProdQueryPassenger = async ()=>{
	try{
		const res8 = await axios.get("http://localhost:8800/reportspassengeravailability")
		setQueryPassenger(res8.data)
	}
	catch(err){console.log(err)}
	
}
getProdQueryPassenger();
},[])


useEffect(()=>{
const getProdQueryTruck = async ()=>{
	try{
		const res9 = await axios.get("http://localhost:8800/reportstruckavailability")
		setQueryTruck(res9.data)
	}
	catch(err){console.log(err)}
	
}
getProdQueryTruck();
},[])

useEffect(()=>{
const getProdQueryIndustrial = async ()=>{
	try{
		const res6 = await axios.get("http://localhost:8800/reportsindustrialavailability")
		setQueryIndustrial(res6.data)
	}
	catch(err){console.log(err)}
	
}
getProdQueryIndustrial();
},[])

useEffect(()=>{
const getProdQuery2 = async ()=>{
	try{
		const res2 = await axios.get("http://localhost:8800/reports2")
		setQuery2(res2.data)
	}
	catch(err){console.log(err)}
	
}
getProdQuery2();
},[])

useEffect(()=>{
const getProdQueryCategoryAvailability = async ()=>{
	try{
		const res3 = await axios.get("http://localhost:8800/reportsprodavailabilitycategories")
		setQuery3(res3.data)
	}
	catch(err){console.log(err)}
	
}
getProdQueryCategoryAvailability();
},[])

console.log(

  prodQuery.length && 
  query2.length && 
  query3.length&& 
  queryEarthMovers.length && 
  queryIndustrial.length && 
  queryTruck.length && 
  queryAgriculture.length && 
  queryPassenger.length &&
  querySpentAgriculture.length &&
  querySpentEarthMovers.length &&
  querySpentIndustrial.length &&
  querySpentPassenger.length &&
  querySpentTruck.length
)

while(
  prodQuery.length>0 && 
  query2.length>0 && 
  query3.length>0&& 
  queryEarthMovers.length>0 && 
  queryIndustrial.length>0 && 
  queryTruck.length>0 && 
  queryAgriculture.length>0 && 
  queryPassenger.length>0 &&
  querySpentAgriculture.length>0 &&
  querySpentEarthMovers.length>0 &&
  querySpentIndustrial.length>0 &&
  querySpentPassenger.length>0 &&
  querySpentTruck.length>0
){


const extractColumn = (arr,col1) =>
{
 return arr.map((x) => x[col1] );
}


const extractColumn2 = (arr,col1,col2) =>
{
 return( arr.map((x) => [x[col1],x[col2]]));
}


const options = {
	chart:{
		type:'column'
	},
  title: {
    text: 'Total Bought per Customer'
  },
  
xAxis:{
	categories:extractColumn(query2,"BusinessName")
},
  
  series: [{
    data: extractColumn(query2,"spent")
  }]}


const  optionsTotalBoughtperCat = {
	chart:{
		type:'column'
	},
  xAxis:{
    type:"category",
    
  },
  title: {
    text: 'Amount of Tyres Ordered per Category'
  },
  
  series: [{

    data: [{
    name:"Earthmovers",
      y:prodQuery[3].Totals,
      drilldown:"Earthmovers2"
  }]

  },
  {
    data:[{
    name:"Industrial",
      drilldown:"Industrial2",
      y:prodQuery[4].Totals
    }]
  },
  {
    data:[{
    name:"Agriculture",
      drilldown:"Agriculture2",
      y:prodQuery[0].Totals
    }]
  },
  {
    data:[{
    name:"Passenger",
      drilldown:"Passenger2",
      y:prodQuery[1].Totals
    }]
  },
  {
    data:[{
    name:"Truck",
      drilldown:"Truck2",
      y:prodQuery[2].Totals
    }]
  }
],

  drilldown:{
    series:[
    {
        name:"Earthmovers",
        id:"Earthmovers2",
        data:extractColumn2(querySpentEarthMovers,"Names","Totals")
    },
    {
        name:"Passenger",
        id:"Passenger2",
        data:extractColumn2(querySpentPassenger,"Names","Totals")
    },
    {
        name:"Truck",
        id:"Truck2",
        data:extractColumn2(querySpentTruck,"Names","Totals")
    },
    {
        name:"Agriculture",
        id:"Agriculture2",
        data:extractColumn2(querySpentAgriculture,"Names","Totals")
    },
    {
        name:"Industrial",
        id:"Industrial2",
        data:extractColumn2(querySpentIndustrial,"Names","Totals")
    }]
  }

}


const optionsAvailabilityByCategory = {
	chart:{
		type:'column'
	},
  xAxis:{
    type:"category",
    
  },
  title: {
    text: 'Availability per category'
  },
  
  series: [{
    data: [{
    name:"Earthmovers",
      y:query3[3].Totals,
      drilldown:"Earthmovers"
  }],	

  },
  {
    data:[{
    name:"Industrial",
      drilldown:"Industrial",
      y:query3[4].Totals
    }]
  },
  {
    data:[{
    name:"Agriculture",
      drilldown:"Agriculture",
      y:query3[0].Totals
    }]
  },
  {
    data:[{
    name:"Passenger",
      drilldown:"Passenger",
      y:query3[1].Totals
    }]
  },
  {
    data:[{
    name:"Truck",
      drilldown:"Truck",
      y:query3[2].Totals
    }]
  }
],

  drilldown:{
    series:[
    {
        name:"Earthmovers",
        id:"Earthmovers",
        data:extractColumn2(queryEarthMovers,"Names","Totals")
    },
    {
        name:"Passenger",
        id:"Passenger",
        data:extractColumn2(queryPassenger,"Names","Totals")
    },
    {
        name:"Truck",
        id:"Truck",
        data:extractColumn2(queryTruck,"Names","Totals")
    },
    {
        name:"Agriculture",
        id:"Agriculture",
        data:extractColumn2(queryAgriculture,"Names","Totals")
    },
    {
        name:"Industrial",
        id:"Industrial",
        data:extractColumn2(queryIndustrial,"Names","Totals")
    }]
  }

}
  

return(
    <div>
        <div style={{  
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
  <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:20,marginBottom:20,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
  <div style={{marginTop:50, position:"absolute",top:20,zIndex:2}}>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
   
   <HighchartsReact
   
    highcharts={Highcharts}
    options={optionsTotalBoughtperCat}
    
  />
  
   <HighchartsReact
    highcharts={Highcharts}
    options={optionsAvailabilityByCategory}
  />
  </div>
</div>
)
}
}
