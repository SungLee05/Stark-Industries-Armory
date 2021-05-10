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
