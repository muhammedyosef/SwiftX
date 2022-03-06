import React, { useContext } from 'react'
import { CurrenceContext } from '../layout/contexts/CurrenceContext'
import { gql } from 'apollo-boost'
import { useQuery} from '@apollo/react-hooks'
import { Link } from 'react-router-dom'

const CLOTHES_QUERY=gql`{
    categories{name,
        products{name,id,gallery,brand,prices{amount,currency{symbol}}}
      }
}`
export default function Clothes() {
    const Products=useQuery(CLOTHES_QUERY);
    const {currence}=useContext(CurrenceContext);
  return (
    <>
    <br/>
    <h1>Clothes</h1>

<div className='container'>
  <div className="row row-cols-1 row-cols-md-3 g-4">
{Products.data!==undefined&& Products.data.categories.map((pro)=>{
  if(pro.name==="clothes")
      return(

          <>
      {Products.data!==undefined&&pro.products.map((prodd)=>{
          return(
              <>
              <div className="col">
  <div className="card" >
  <Link to={`/ProductDetails/${prodd.id}`} key={prodd.id}>

    <img src={prodd.gallery[0]} className="card-img-top" alt="..." style={{height:350}}/>
    <div className="card-body">
      <h5 className="card-title ">{prodd.name}</h5>
      {prodd.prices.map((cu)=>{
          if(cu.currency.symbol===currence)
    
          return(
      <p className="card-text">{cu.amount}{cu.currency.symbol}</p>

          )
      })}
    </div>
    </Link>

  </div>
</div>
              </>
          )
      })}
 
      </>
          )
  
})}
</div>
</div>
  </>
  )
}
