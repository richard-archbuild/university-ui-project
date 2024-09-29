import axios from "axios";
import ProductComponent from "./SearchProductComponent2"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function EditProduct(){
  
  const location = useLocation()
  const order_id = location.pathname.split("/")[2];
  
  const [currentOrder,setCurrentOrder] = useState([])
  const [productList,setProductList] = useState([])
  const [productsInOrder,setProductsInOrders] = useState([])

  const backendAddress = "http://localhost:8800/"
  
  useEffect(() =>{
    const getSelectedOrder = async e=>{

      try{
        const res = await axios.post(backendAddress + "edit-order/",{order_id:order_id})
        console.log("Order Data: ",res.data)
        setCurrentOrder(res.data)
      }
      catch(err){console.log(err)}

    }

    const getProducts = async e=>{

      try{
        await axios.get(backendAddress + "products").then((response)=>{
          console.log("Product Data: ",response.data)
          setProductList(response.data)
        }
      )
      }
      catch(err){console.log(err)}

    }

    getSelectedOrder()
    getProducts()

  },[])

  const setProducts = () =>{
  
    if(currentOrder.length>0 && productList.length>0){
      for(let x = 0;x<=currentOrder.length-1;x++)
      {
        for(let y = 0;y<=productList.length-1;y++)
        {
          if( currentOrder[x].product_id == productList[y].product_id)
          {
            productsInOrder.push(productList[y])
          }
        }
      }
    }
    console.log("Final Sorted Data: ",productsInOrder)
  }

  useEffect(()=>{
    if(productsInOrder.length<currentOrder.length)
      {
        setProducts()
      }
  },[currentOrder,productList])



  return(
  <div>
    {productsInOrder.map((product,index) => 
      (
      <ProductComponent key={index} data={product}/>
      ))
      }
  </div>
  )
}
