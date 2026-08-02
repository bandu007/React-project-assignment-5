import React from 'react'
import { useState,useEffect } from 'react'



function useFetch(url) {

const [products, setProduct] = useState([])
const [loading, setLoading] = useState(true)
const [disconnect,setDisconnect] = useState(false)
useEffect(()=>{
    
fetch(url)
.then((response)=>(response.json()))
.then((data)=>{
    setProduct(data)
    setLoading(false)

})
.catch((error)=>{
    setDisconnect(true)
})


},[url])
  return {
    products,loading,disconnect
  }
}



function ProductList(){
    const {products,loading,disconnect} = useFetch("https://fakestoreapi.com/products")
      

    return(
        
        <div>
            <div>
                {disconnect ? <h1>Error in connection</h1>:<h1></h1>}
            </div>
            
            { loading && !disconnect ?(<h1>Loading...</h1>):(products.map((item)=>(
                    <div key ={item.id}>
                        <h2>{item.title}</h2>
              <img src={item.image} alt="" />
    <p><strong>Price:</strong>{item.price}</p>
    <p><strong>Description:</strong>{item.description}</p>
    <p><strong>Category:</strong>{item.category}</p>
    <p><strong>Rating:</strong>{item.rating.rate}</p>
    <p><strong>Reviews:</strong>{item.rating.count}</p>
                    </div>
                )))
                
            }
        </div>
    )
}

export default ProductList
