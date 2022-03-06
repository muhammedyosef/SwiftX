import React, { useContext } from 'react'
import { gql } from 'apollo-boost'
import { useQuery} from '@apollo/react-hooks'
import { CurrenceContext } from '../layout/contexts/CurrenceContext'
import { Link } from 'react-router-dom'
const PRODUCT_QUERY=gql`{

    
        category{
          products{name,id,gallery,brand,prices{amount,currency{symbol}}}
        }
      
}`


export default function Productlist() {
    const allProd=useQuery(PRODUCT_QUERY);
    const {currence}=useContext(CurrenceContext);
    
  return (
      <>
      <br/>
       
<h1 className='p-3'>All</h1>

<div className='container'>
    <div className="row row-cols-1 row-cols-md-3 g-4">
{  allProd.data!==undefined&& allProd.data.category.products.map((prod)=>{
        return (
 
  <div className="col">
    <div className="card" >
        <Link to={`/ProductDetails/${prod.id}`} key={prod.id}>
      <img src={prod.gallery[0]} className="card-img-top" alt="..." style={{height:350}}/>
      <div className="card-body">
        <h5 className="card-title ">{prod.name}</h5>
        {prod.prices.map((cu)=>{
            if(cu.currency.symbol===currence)
      
            return(
        <p className="card-text">{cu.amount}{cu.currency.symbol}</p>

            )
        })}
      </div>
      </Link>

    </div>
  </div>
  
  
  )
})}

</div>
</div>

    
      
      </>
  )
}
