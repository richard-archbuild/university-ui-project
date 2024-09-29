import express from "express"
import mysql from "mysql"
import cors from "cors"

const  app = express()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"safetygripdb"
})

app.get("/",(req,res)=>{
    res.json('this is the backend')
})


app.delete("/cartitemdelete/:orderid/:prodid",(req,res)=>{
    const prodID = req.params.prodid;
    const orderID = req.params.orderid;
    const q = 'delete from orders where `order_id` = ? AND `product_id`=?'

  console.log(values)


    db.query(q,[orderID,prodID],(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/assignments",(req,res)=>{
    const q = 'SELECT idAssignments, Business_TaxNo, Status, Driver_ID, Order_ID,DATE_FORMAT(AssignmentCreated,\'%y-%m-%d\') as AssignmentCreated FROM safetygripdb.assignments;'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/reports",(req,res)=>{
    const q = 'select products.product_type as Names, sum(orders.quantity)as Totals from orders, products where products.product_id = orders.product_id group by products.product_type'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/reportsorderedtrucks",(req,res)=>{

    const q = 'select products.product_name as Names, orders.quantity as Totals from orders, products where products.product_id = orders.product_id and products.product_type="Truck"  '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})
app.get("/reportsorderedagri",(req,res)=>{

    const q = 'select products.product_name as Names, orders.quantity as Totals from orders, products where products.product_id = orders.product_id and products.product_type="Agriculture"'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.get("/reportsorderedindustrial",(req,res)=>{

    const q = 'select products.product_name as Names, orders.quantity as Totals from orders, products where products.product_id = orders.product_id and products.product_type="Industrial" '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.get("/reportsorderedearthmover",(req,res)=>{

    const q = 'select products.product_name as Names, sum(orders.quantity) as Totals from orders, products where products.product_id = orders.product_id and products.product_type="Earthmover" group by products.product_name '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/reportsorderedpassenger",(req,res)=>{

    const q = 'select products.product_name as Names, sum(orders.quantity) as Totals from orders, products where products.product_id = orders.product_id and products.product_type="Passenger" group by products.product_name'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/reports2",(req,res)=>{
    const q = 'SELECT customers.BusinessName,sum(orderproduct.total_price) as spent from customers,orderproduct where customers.Business_TaxNo = orderproduct.business_taxno group by customers.BusinessName'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.get("/reportsprodavailabilitycategories",(req,res)=>{
    const q = 'SELECT products.product_type as Types, sum(products.product_count) as Totals from products group by products.product_type'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/reportsearthmoveravailability",(req,res)=>{
    const q = 'SELECT products.product_name as Names, products.product_count as Totals from products where products.product_type = "Earthmover" '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.get("/reportsindustrialavailability",(req,res)=>{
    const q = 'SELECT products.product_name as Names, products.product_count as Totals from products where products.product_type = "Industrial" '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/reportsagricultureavailability",(req,res)=>{
    const q = 'SELECT products.product_name as Names, products.product_count as Totals from products where products.product_type = "Agriculture" '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.get("/reportstruckavailability",(req,res)=>{
    const q = 'SELECT products.product_name as Names, products.product_count as Totals from products where products.product_type = "Truck" '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})
app.get("/reportspassengeravailability",(req,res)=>{
    const q = 'SELECT products.product_name as Names, products.product_count as Totals from products where products.product_type = "Passenger" '
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/order",(req,res)=>{
    const q = "SELECT distinct order_id FROM safetygripdb.orders order by order_id desc limit 1;"

    db.query(q,(err,data)=>{
        if(err){return res.json(err)}
        res.json(data)
    })
})


app.get("/drivers" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.drivers;'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/vehicles2" ,(req,res)=>{
    const q = 'SELECT vehicles.License_Plate FROM safetygripdb.vehicles where Status="Unassigned";'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.put("/update-driver" ,(req,res)=>{
    
    const q = 'UPDATE safetygripdb.drivers SET `Driver_fname` = ?,`driver_lname` = ?,`driver_phone_no` = ?,`license_no` = ?,`Vehicle_noPlate` = ? WHERE `Driver_ID` = ?;'
   
    const values =[
        req.body.Driver_fname,
        req.body.driver_lname,
        req.body.driver_phone_no,
        req.body.license_no,
        req.body.Vehicle_noPlate,
        req.body.Driver_ID,
    ]

    db.query(q,[...values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.put("/add-driver" ,(req,res)=>{
    
    const q = 'UPDATE safetygripdb.vehicles SET `Status` = ? WHERE `License_Plate` = ?;'
   
    const values =[
        req.body.Status,
        req.body.License_Plate
    ]

    db.query(q,[...values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})


app.put("/update-order" ,(req,res)=>{
    
    const q = 'UPDATE safetygripdb.orderproduct SET `order_status` = ? WHERE `orderproduct_id` = ?;'
   
    const values =[
        req.body.order_status,
        req.body.orderproduct_id
    ]

    db.query(q,[...values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.post("/orderproduct", (req,res)=>{
    const q = "INSERT INTO safetygripdb.orderproduct(`total_price`, `business_taxno`, `salesrep_id`, `order_id`) VALUES (?)";
    const values = [
        req.body.total_price,
        req.body.business_taxno,
        req.body.salesrep_id,
        req.body.order_id, 
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Order has been created");
    })
})
app.post("/orderproduct", (req,res)=>{
    const q = "INSERT INTO safetygripdb.orderproduct(`total_price`, `business_taxno`, `salesrep_id`, `order_id`) VALUES (?)";
    const values = [
        req.body.total_price,
        req.body.business_taxno,
        req.body.salesrep_id,
        req.body.order_id, 
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Order has been created");
    })
})

app.post("/create-product", (req,res)=>{
    const q = "INSERT INTO safetygripdb.products(`brand`,`product_name`,`product_count`, `price`, `product_type`) VALUES (?)";
    const values = [
        req.body.brand,
        req.body.product_name,
        req.body.product_count,
        req.body.price, 
        req.body.product_type, 
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Product has been created");
    })
})

app.post("/orderproduct", (req,res)=>{
    const q = "INSERT INTO safetygripdb.orderproduct(`total_price`, `business_taxno`, `salesrep_id`, `order_id`) VALUES (?)";
    const values = [
        req.body.total_price,
        req.body.business_taxno,
        req.body.salesrep_id,
        req.body.order_id, 
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Order has been created");
    })
})

app.get("/orderproduct" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.orderproduct;'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/orderproduct2" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.orderproduct WHERE order_status="Unassigned";'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/orders" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.customers;'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})
app.get("/customers" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.customers;'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.get("/products" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.products;'
    
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
    res.json(data)
    });
})

app.post("/products_final" ,(req,res)=>{
    const q = 'SELECT * FROM safetygripdb.products WHERE `product_type` LIKE ? OR `brand` LIKE ? OR `product_name` LIKE ?;'
  const values =[
    req.body.product_type,
    req.body.brand,
    req.body.product_name,
  ]
    db.query(q,[...values],(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.put("/products/:id" ,(req,res)=>{
    const prodID = req.params.id;
    const q = 'UPDATE safetygripdb.products SET `brand` = ?,`product_name` = ?,`product_count` = ?,`price` = ?,`product_type`=? WHERE `product_id` = ?;'
   
    const values =[
        req.body.brand,
        req.body.product_name,
        req.body.product_count,
        req.body.price,
        req.body.product_type,
    ]

    db.query(q,[...values,prodID],(err,data)=>{
        if(err){
            return res.json(err);
        }
        res.json(data)
    });
})

app.post("/drivers", (req,res)=>{
    const q = "INSERT INTO safetygripdb.drivers(`Driver_fname`,`driver_lname`,`driver_phone_no`,`license_no`,`Vehicle_noPlate`) VALUES (?)";
    const values = [
        req.body.Driver_fname,
        req.body.driver_lname,
        req.body.driver_phone_no,
        req.body.license_no, 
        req.body.Vehicle_noPlate, 
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Driver has been created");
    })
})


//Edit orders
app.post("/edit-order", (req,res)=>{
    const q = "SELECT * FROM safetygripdb.orders WHERE `order_id` = ? ";
    const values = [
        req.body.order_id,
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json(data)
    })
})


app.post("/order", (req,res)=>{
    const q = "INSERT INTO safetygripdb.orders(`order_id`,`product_id`,`quantity`) VALUES (?)";
    const values = [
        req.body.order_id,
        req.body.product_id,
        req.body.quantity,
      
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Order has been created");
    })
})


app.post("/assignments", (req,res)=>{
    const q = "INSERT INTO safetygripdb.assignments(`Business_TaxNo`, `Status`, `Driver_ID`, `Order_ID`, `AssignmentCreated`) VALUES (?)";
    const values = [
       req.body.Business_TaxNo, 
       req.body.Status, 
       req.body.Driver_ID, 
       req.body.Order_ID, 
       req.body.AssignmentCreated 
    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err);
            return res.json("Assginment has been created");
    })
})


app.listen(8800, ()=>{
    console.log("Connected")
})
