//make this able to handle multiple words in the input
import React,{useState} from 'react'
import ButtonComponent from './ButtonComponent';
import styles from "./ProdCompnentStyles.js";
import SearchProductComponent from "./SearchProductComponent";
import  axios from "axios";

export default function Product_Final(){
  const [productSelection,setProductSelection] = useState([])
  const [searchTerm,setSearchTerm] = useState()

  const retrieveProducts = async e =>{
    try{

      const res = await axios.post("http://localhost:8800/products_final",searchTerm)
      console.log(res.data)
      setProductSelection(res.data)
    }
    catch(err){console.log(err)}
  }

  const onTextChange =(e)=>{
    setSearchTerm({
      product_type:'%' + e.target.value +'%',
      brand:'%' + e.target.value +'%',
      product_name:'%' + e.target.value +'%',
    }); 
    console.log(searchTerm);
  }

  return(
  <div style={styles.backgroundImage}>
      <div style={styles.shade}/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"absolute",top:20,left:"35%"}}>
        <input placeholder='Search for a product' 
          style={{
          color:"#cdcdcd",
          backgroundColor:"#2D2D2D",
          height:40,
          width:600,
          border:"0px solid grey"
          }} 

          type={"text"} onChange={onTextChange}/>
        <div style={{width:200,marginLeft:80,marginTop:20}}><ButtonComponent label={"Search"} onClick={retrieveProducts}/></div>
      </div>
      
      <div style={{zIndex:2,width:1500,height:800,position:"absolute",top:130,right:50,overflow:"scroll"}}>

        <table style={{backgroundColor:"rgba(255,0,0,0.4)"}}>
          <thead>
            <tr>
              
            </tr>
          </thead>

          <tbody>
            {productSelection.map((product)=>
              <tr>
                <SearchProductComponent 
                  key={product.product_id} 
                  data = {product}
                />

              </tr>
            )}
          </tbody>
        </table>

      </div>
  </div>
  )
}
