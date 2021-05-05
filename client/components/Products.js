import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import ProductCard from './ProductCard'

const Products = props => {
  const {fetchAllProducts, products} = props

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <>
      <div className="all-products-container">
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
        <ProductCard products={products} />
      </div>
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
