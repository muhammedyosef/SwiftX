import React, { useState ,useContext, useEffect} from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from "react-router-dom";
import { CurrenceContext } from '../layout/contexts/CurrenceContext'
import { CartContext } from '../layout/contexts/CartContext';


export default function ProductDetails() {
  const params = useParams();
  const [photo,setPhoto]=useState("");
  const [val,setVal]=useState("");
 
  const {currence}=useContext(CurrenceContext);
  const {cartProd,setCartProd}=useContext(CartContext);
  
  const PRODUCT_QUERY=gql`{
    product(id:"${params.id}"){
     
     name
     inStock
     gallery
     category
     id
     prices{
       amount
       currency{label symbol}
     }
     brand
     description
     attributes{name,type,items{value,displayValue,id}}
   }
   
   }`
   const details=useQuery(PRODUCT_QUERY); 
 
const handleClick=()=>{
  details.data.size=val
  details.data.DisplayOrder=1
setCartProd([...cartProd,details.data]);
}
  return (
    <>
    <br></br>
    <div className='container'>
      <div className='row'>
        <div className='col-2'>
          {details.data!==undefined&& details.data.product.gallery.map((im)=>{
            return(
              <>
              <img src={im} style={{height:150,width:150}} onClick={e=>{setPhoto(im)}}/>
              <br/>
              <hr/>
              </>

            )
            
          })}
        </div>
        <div className='col-5'>
          <img src={photo} style={{width:500}}/>
        </div>
        <div className='col-5'>
          <h1 className='text-center'>{details.data!==undefined&&details.data.product.brand}</h1>
          <h3 className='text-center mb-5'>{details.data!==undefined&& details.data.product.name}</h3>
    
                                 <div className='mb-5'>
                                    <h4>Size:</h4>
                                   {details.data!==undefined&&details.data.product.attributes[0].items.map((i)=>{
                                     return(
                                       <button type="button" onClick={e=>setVal(e.target.value)} className="btn btn-outline-info m-2"value={i.displayValue}>{i.displayValue}</button>
                                     )
                                   })}
                                   
                                </div>
                                <div className='mb-5'>
                                  <h4>Price:</h4>
                                  {details.data!==undefined&&details.data.product.prices.map((cu)=>{
                                     if(cu.currency.symbol===currence)
    
                                     return(
                                 <h4 className="card-text" id='henaa'>{cu.currency.symbol}{cu.amount}</h4>
                           
                                     )
                                  })}
                                </div>
                                <br/>
                                <div className="d-grid gap-2 col-6 mx-auto">
                              <button className="btn btn-primary" type="button" onClick={()=>handleClick()}>Add To Cart</button>
                              </div>
                              <br/>
                              <div>
                                <div dangerouslySetInnerHTML={{__html:details.data!==undefined&&details.data.product.description }}/>
                              </div>
        </div>
      </div>
    </div>
    </>
  )
}
