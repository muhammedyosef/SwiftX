import logo from './logo.svg';
// import './App.css';
import Productlist from './component/Productlist';
import { CurrenceProvider } from './layout/contexts/CurrenceContext';
import { useState } from 'react';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Clothes from './component/Clothes';
import Tech from './component/Tech';
import ProductDetails from './component/ProductDetails';
import { CartProvider } from './layout/contexts/CartContext';
import Cart from './component/Cart';

function App() {
  const[currence,setCurrence]=useState("$")
  const[cartProd,setCartProd]=useState([])
  console.log(currence);
  return (
    <div className="App">
      <CartProvider value={{cartProd,setCartProd}}>

      <CurrenceProvider value={{currence,setCurrence}}>
        <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Productlist}/>
          <Route path='/All' exact component={Productlist}/>
          <Route path='/Clothes' exact component={Clothes}/>
          <Route path='/Tech' exact component={Tech}/>
          <Route path='/Cart' exact component={Cart}/>
          <Route path='/ProductDetails/:id' exact component={ProductDetails}/>
        </Switch>

        </Router>

      </CurrenceProvider>
      </CartProvider>
    </div>
  );
}

export default App;
