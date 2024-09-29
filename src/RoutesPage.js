import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import EditOrder from "./EditOrder"
import ProdFinal from "./Product_Final"
import HomeScreen from './HomeScreen'
import Reports from './Reports'
import Drivers from './Drivers'
import AddDriver from './AddDriver'
import Assignments from './assignments'
import CreateAssignment from './CreateAssignment'
import Orders from './Orders'
import CreateOrder from './CreateOrder'
import Products from './Products'
import EditProduct from './EditProduct'
import Login from './Login'
import CreateProduct from './CreateProduct'

export const RoutesPage = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/edit-order/:id" element={<EditOrder/>} />
                <Route path="/prodfinal" element={<ProdFinal/>} />
                <Route path="/create-product" element={<CreateProduct/>} />
                <Route path="/homescreen/:id" element={ <HomeScreen/> } />
                <Route path="/drivers" element={<Drivers/> }/>
                <Route path="/reports" element={<Reports/> }/>
                <Route path='/assignments' element={<Assignments/>} />
                <Route path='/add-driver' element={<AddDriver/>} />
                <Route path='/create-assignment' element={<CreateAssignment/>} />
                <Route path='/orders' element={<Orders/>} />
                <Route path='/create-order' element={<CreateOrder/>} />
                <Route path='/products' element={<Products/>} />
                <Route path='/edit-product/:id' element={<EditProduct/>} />
                
            </Routes>
        </Router>
    )
}
