import React, { useContext, useState } from 'react'
import { CartContext } from '../layout/contexts/CartContext';
import { CurrenceContext } from '../layout/contexts/CurrenceContext';

export default function Cart() {
  const {cartProd}=useContext(CartContext);
  const [prod,setProd]=useState(1);
  const {currence}=useContext(CurrenceContext);

  const removeitem = (id) => {
    if(id>-1){
       cartProd.splice(id,1);
    }
    setProd(prod+1);
  };
  const increment=(id)=>{
    cartProd[id].DisplayOrder+=1;
    setProd(prod+1);
  }
  const decrement=(id)=>{
    if(cartProd[id].DisplayOrder>1){
      cartProd[id].DisplayOrder-=1;
    }else{cartProd[id].DisplayOrder=1;
    }
    setProd(prod+1);
  }
  return (
    <>
    <div className='container'>
        <h1>Cart</h1>
        {cartProd!==undefined&& cartProd.map((prod,index)=>{
                    return(
                      <>
    <button type="button" className="btn-close d-flex ms-auto"   onClick={() => removeitem(index)}></button>
                  <div className="card mb-3 border-0" >
  <div className="row g-0">
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
      <div className="d-grid gap-2  justify-content-md-end">
  <button className="btn btn-dark" type="button " onClick={()=>increment(index)}>+</button>
  <span>{prod.DisplayOrder}</span>
  <button className="btn btn-dark" type="button"onClick={()=>decrement(index)}>-</button>
</div>
    </div>
    <div className="col-md-4">
      <img src={prod.product.gallery[0]} className="img-fluid rounded-start" alt="..."/>
    </div>
  </div>
</div>
                  <hr/>
                      </>
                    )
                  })}
        </div>
    </>
  )
}
