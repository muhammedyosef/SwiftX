import React, { useContext, useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery} from '@apollo/react-hooks'
import { CurrenceContext } from './contexts/CurrenceContext'
import { Link } from 'react-router-dom'
import { CartContext } from './contexts/CartContext'
import { useHistory } from 'react-router-dom'
const CLOTHES_QUERY=gql`{
    categories{name,
        products{name,gallery,brand,prices{amount}}
      }
}`
const CURRENCE_QUERY=gql` {
    currencies{symbol}
}`
export default function Navbar() {
  const {cartProd}=useContext(CartContext);
  const [prod,setProd]=useState(1);
const history=useHistory();
    const Products=useQuery(CLOTHES_QUERY);
    const currence1=useQuery(CURRENCE_QUERY);
const{currence,setCurrence}=useContext(CurrenceContext);
// console.log(currence);
const removeitem = (id) => {
  if(id>-1){
     cartProd.splice(id,1);
  }
  setProd(prod+1);
};
const increment=(id)=>{
  // const res =cartProd[id].DefaultPrice
  cartProd[id].DisplayOrder+=1;
  // cartProd[id].FinaltPrice=res*cartProd[id].DisplayOrder;
  setProd(prod+1);
}
const decrement=(id)=>{
  // const res =cartProd[id].DefaultPrice
  if(cartProd[id].DisplayOrder>1){
    cartProd[id].DisplayOrder-=1;
    // cartProd[id].FinaltPrice=res*cartProd[id].DisplayOrder;
  }else{cartProd[id].DisplayOrder=1;
    // cartProd[id].FinaltPrice =cartProd[id].DefaultPrice
  }
  setProd(prod+1);
}
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">E-Commerce</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
          {Products.data!==undefined&&Products.data.categories.map((pro)=>{
              return(<li className="nav-item">
              <Link className="nav-link active" to ={`/${pro.name}`}>{pro.name}</Link>
            </li>)
          })}
<li className="nav-item dropdown " onClick={e=>{e.stopPropagation()}}>
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src='https://www.pngall.com/wp-content/uploads/5/Shopping-Cart-PNG-Images.png' style={{width:30,height:30}}/>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{width:300,overflow:"scroll",height:300}}>
          
 {cartProd!==undefined&& cartProd.map((prod,index)=>{
                    return(
                      <>
                       <li key={prod.ID}>
    <button type="button" className="btn-close d-flex ms-auto"   onClick={() => removeitem(index)}></button>
                  <div className="card mb-3 border-0" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={prod.product.gallery[0]} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{prod.product.name}</h5>
        {prod.product.prices.map((cu)=>{
                                     if(cu.currency.symbol===currence)
    
                                     return(
        <p className="card-text"><small className="text-muted">{cu.currency.symbol}{cu.amount*prod.DisplayOrder} </small></p>
                           
                                     )
                                  })}
                                  <small>

                                       <button type="button"  className="btn btn-dark btn-sm">{prod.size}</button>
                                  </small>

      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-dark" type="button" onClick={()=>increment(index)}>+</button>
  <span>{prod.DisplayOrder}</span>
  <button className="btn btn-dark" type="button"onClick={()=>decrement(index)}>-</button>
</div>
    </div>
  </div>
</div>
                  </li>
                  <hr/>
                      </>
                    )
                  })}
                  {cartProd.length!==0?
            <button type="button"  className="btn btn-dark btn-sm" onClick={()=>history.push('/Cart')}>See Cart</button>:<p>empty</p>
                  
                }

          </ul>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" hidden aria-label="Search"/>
        <select className="form-select my-3 bg-secondary text-white"  aria-label="Default select example" onChange={e=>{setCurrence(e.target.value)}}>
  <option selected value={'$'}>Currence</option>
  {currence1.data!==undefined&&currence1.data.currencies.map((cur)=>{
    return(
  <option  value={cur.symboll}>{cur.symbol}</option>

    )
  })}
  
</select> 
      </form>
      
    </div>
  </div>
</nav>

    </div>
  )
}
