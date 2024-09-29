import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect,useState } from "react";
import Background from "./Images/pexels-tiger-lily-4481534.jpg"
import ButtonComponent from "./ButtonComponent";

export default function CreateOrder(){
    const navigate = useNavigate()
    const [getProducts,setGetProducts] = useState([])
    const [selctedProduct,setSelectedProduct] = useState(0)
    const [selectedCustomer,setSelectedCustomer] = useState(0)
    const [getCustomers,setGetCustomers] = useState([])
    const [getOrderID,setGetOrderID] = useState([])
    const [getQuantity,setGetQuantity] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [allItems,setAllItems] = useState([])
    const [isCustomerEnabled,setIsCustomerEnabled] = useState(true)
    const [finalized,setFinalized] = useState(false)

const tableStyle = {
  width: '50vh',
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
    var setSelPrice = 0
const selectStyle = {
    backgroundColor: '#2C2C2C', // Red background
    color: '#CDCDCD',           // Black text
    border: '1px solid #000000', // Black border
    borderRadius: '2px',        // Rounded corners
    marginTop:10,
    paddingLeft: '8px',        // Padding inside the select box
    width:400,
    fontSize: '16px',           // Font size
    marginLeft:20,
    height:40,
    alignContent:"right"
  };
    
    useEffect(()=>{
        try{
            const fetchOrderNumber = async e=>{
                const res = await axios.get("http://localhost:8800/order")
                console.log(res.data)
                setGetOrderID(res.data[0].order_id+1)
            }
            fetchOrderNumber();
        }
        catch(err){console.log(err)}
    },[])
    
    useEffect(()=>{
        try{
            const fetchCustomers = async e=>{
                const res = await axios.get("http://localhost:8800/customers")
                setGetCustomers(res.data)
            }
            fetchCustomers();
        }
        catch(err){console.log(err)}
    },[])

    useEffect(()=>{
        try{
        const fetchProducts = async e =>{
            const res = await axios.get("http://localhost:8800/products")
            setGetProducts(res.data)
        } 
        fetchProducts(); 
    }
    catch(err){console.log(err)}
    },[])


    const handleProductChange = (e) =>{
        setIsCustomerEnabled(false)
        setSelectedProduct(e.target.value)
    }
const handleCustomerChange = (e) =>{
        setSelectedCustomer(e.target.value)
        
}
    const handleQuantityChange =(e) =>{
        setIsCustomerEnabled(false)
        if(e.target.value>getProducts[selctedProduct].product_count) {
            console.log("too much quan")
            setGetQuantity(0)
        }
        else{
        setGetQuantity(e.target.value)
        console.log("success")
    }
    }   

    
    const handleAddItem = async e =>{
        setSelPrice = getProducts[selctedProduct].price * getQuantity
        setTotalPrice(setSelPrice+totalPrice)
        const ordDetails = {
            order_id:getOrderID,
            product_id:getProducts[selctedProduct].product_id,
            quantity:getQuantity
        }
        console.log(ordDetails)
        const dispDetails ={
            order_id:getOrderID,
            product_id:getProducts[selctedProduct].product_id,
            product_name:getProducts[selctedProduct].product_name,
            quantity:getQuantity,
            price: getProducts[selctedProduct].price
        }
        setAllItems([...allItems,dispDetails])
        console.log(allItems)
  try{
        await axios.post('http://localhost:8800/order',ordDetails);
  ;
    
    }
    catch(err){
        console.log(err)
    }
};


const handleFinalize = async e =>{
    setFinalized(true)
    const ordProdDetails = {
        total_price: totalPrice,
        business_taxno:getCustomers[selectedCustomer].Business_TaxNo,
        salesrep_id:"RJ0042",
        order_id:getOrderID,
        order_status:"Unassigned"
    }
  try{
        await axios.post('http://localhost:8800/orderproduct',ordProdDetails).then(function (response) {
            console.log(response.data);
        })

  ;
    
    }
    catch(err){
        console.log(err)
    }
}


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
            backgroundColor: 'rgba(52, 52, 52, 0.7)',
            zIndex:-2
         }}/>
            <div className="CustomersDB" style={{alignContent:"center"}}>
                <h1 style={{marginLeft:20,color:"white",marginTop:60}}>Create a New Order</h1>
            <select disabled={!isCustomerEnabled} onChange={handleCustomerChange} style={selectStyle}  defaultValue={0}>
            {getCustomers.map((customer, index)=>(
                <option value={index} key={customer.Business_TaxNo} >{customer.BusinessName}</option>
            ))}
            </select>
            </div>
            
            <div className="ProductsDB">
            <select  onChange={handleProductChange} style={selectStyle} defaultValue={0}>
            {getProducts.map((product, index)=>(
                <option value={index} key={product.product_id} >{product.brand} {product.product_name}</option>
            ))}
            </select>
            </div>
            <input placeholder="Quantity" type="number" value={getQuantity} name={"quantity"} style={selectStyle}onChange={handleQuantityChange} />

            <div style={{width:"15%",marginBottom:10,marginTop:10,marginLeft:20}}>
            <ButtonComponent onClick={handleAddItem}label={"Add Item To Order"}/>
            </div>
            <div style={{marginLeft:20}}>
            <ButtonComponent onClick={handleFinalize} label={"Finalize Order"} style={{width:500}}/>
            </div>
            <p style={{color:"#CDCDCD",marginLeft:20}}>Total Price: R{totalPrice}</p>
          {finalized? <p style={{marginLeft:20,color:"white"}}>Order Has Been Created</p>:<p/>}   



 {allItems.length>0?
            <table style={tableStyle}>
                <thead style={tableHeaderStyle} >
                    <tr>
                        <th style={thStyle}>Item Name</th>
                        <th style={thStyle}>Quantity</th>
                        <th style={thStyle}>Price</th>
                    </tr>
                </thead>
                <tbody >
            {allItems.map((Item,index) =>(
                <tr style={rowStyle(index)}  key={Item.product_id}>
                    <td style={tdStyle}>{Item.product_name}</td>
                    <td style={tdStyle}>{Item.quantity}</td>
                    <td style={tdStyle}>{Item.price}</td>
                </tr>
            )) }
            </tbody>
            </table>
        :
        <p></p>    
        }

            <Link onClick={()=>{navigate(-1)}} style={{position:"absolute",top:10,left:20,zIndex:2}} > <ButtonComponent label={"Back"}/> </Link>
        </div>
    )
}