import  React  from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "./ButtonComponent.js";
import styles from "./ProdCompnentStyles.js"
import backImage from "./Images/truck_tyre-transformed.png";

export default function SearchProductComponent({data}) {
  return (
    <div style={{display:"flex",flexDirection:"row",padding:30}}>
        <img src={backImage} width={300} height={300} alt={"Tyre"}/>

      <div style={{backgroundColor:"#2C2C2C",width:800,paddingLeft:20}}>
        <div style={{marginTop:20}}>
          <p style={{color:"#CDCDCD"}}>ID: {data.product_id}</p>
          <p style={{color:"#CDCDCD"}}>Name: {data.product_name}</p>
          <p style={{color:"#CDCDCD"}}>Brand: {data.brand}</p>
          <p style={{color:"#CDCDCD"}}>Type: {data.product_type}</p>
          <p style={{color:"#CDCDCD"}}>Price: {data.price}</p>
          <p style={{color:"#CDCDCD"}}>Count: {data.product_count}</p>
        </div>
        <div>
          <Link to={`/edit-product/${data.product_id}`}><ButtonComponent label={"edit product"}/></Link>
        </div>
       </div> 
    </div>
  )
}
