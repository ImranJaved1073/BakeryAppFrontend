import { Route, BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Products from './Components/Products';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import ProductDetails from './Components/ProductDetails';
import AddProduct from './Components/AddProduct'
import Cart from './Components/Cart';
import UpdateProduct from './Components/UpdateProduct';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content" style={{
          paddingTop: "96px"
        }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>  
            <Route path="/products/productDetails/:id">
              <ProductDetails />
            </Route> 
            <Route path="/AddProduct">
              <AddProduct />
            </Route>
            <Route path="/Dashboard">
              <Dashboard />
            </Route>    
            <Route path="/cart">
              <Cart />
            </Route> 
            <Route path="/UpdateProduct/:id">
              <UpdateProduct />
            </Route>        
          </Switch>            
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
