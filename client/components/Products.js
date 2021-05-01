import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

const Products = props => {
  const {fetchAllProducts, products} = props

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <>
      <h1>ALL PRODUCTS PAGE</h1>
      <div>
        <select>
          <option value="all">All Products</option>
          <option value="alpha_asc">Name (A-Z)</option>
          <option value="alpha_desc">Name (Z-A)</option>
          <option value="price_asc">Price (Low-High)</option>
          <option value="price_desc">Price (High-Low)</option>
        </select>
      </div>
      <br />
      {products.map(product => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <img src={product.imageUrl} height="200" />
            <h4>{product.name}</h4>
            <h4>{(product.price * 1).toFixed(2)}</h4>
            <p>{product.description}</p>
          </Link>
        </div>
      ))}
    </>
  )
}

const mapState = state => {
  return {
    products: state.allProductsReducer.all
  }
}
const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => {
      dispatch(fetchProducts())
    }
  }
}
export default connect(mapState, mapDispatch)(Products)
