import axios from "axios";
import ButtonComponent from "./ButtonComponent";
import React, { useEffect, useState } from "react";
import { FaPencilAlt } from 'react-icons/fa'
import { Link, useNavigate} from "react-router-dom";
import Background from "./Images/pexels-olly-3806252.jpg"

export default function Products(){
  const [selectedIndex, setSelectedIndex] = useState(null);
const navigate = useNavigate();
const [products, setProducts] = useState([])
    useEffect(()=>{
        const fetchProducts = async e=>{
            const res = await axios.get("http://localhost:8800/products")
            setProducts(res.data)
            console.log(res.data)

        }
        fetchProducts();
    },[])

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
    <h2 style={{color:"white",textAlign:"center"}}>Products</h2>
    <div className="Products">
        <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={thStyle}>Product ID</th>
                <th style={thStyle}>Product Brand</th>
                <th style={thStyle}>Product Name</th>
                <th style={thStyle}>Product Count</th>
                <th style={thStyle}>Product Price</th>
                <th style={thStyle}>Product Type</th>
                <th style={thStyle}>Edit</th>
                </tr>
            </thead>
            <tbody>
        {products.map((product,index) =>(
            <tr key={product.product_id} style={rowStyle(index)}>
                <td style={tdStyle}>{product.product_id}</td> 
                <td style={tdStyle}>{product.brand}</td>
                <td style={tdStyle}>{product.product_name}</td> 
                <td style={tdStyle}>{product.product_count}</td> 
                <td style={tdStyle}>{product.price}</td> 
                <td style={tdStyle}>{product.product_type}</td> 
                
                <td style={tdStyle}>
                  <Link 
                  onMouseLeave={()=>{setSelectedIndex(null)}} 
                  onMouseEnter={()=>{setSelectedIndex(index)}} 
                  to={`/edit-product/${product.product_id}`}>
                    <FaPencilAlt style={{color: index === selectedIndex ? 'red' : '#CDCDCD',}}/>
                  </Link>

                </td>
            </tr>
        ))}
        </tbody>
        </table>
    </div>
            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:60,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
</div>
)
}
