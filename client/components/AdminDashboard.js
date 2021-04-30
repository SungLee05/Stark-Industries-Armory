import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
  adminFetchProductsThunk,
  deleteProductThunk,
  createProductThunk,
  updateProductThunk
} from '../store/adminDashboard'
import {} from '../store/allProducts'

const AdminDashboard = prop => {
  const {
    adminFetchProducts,
    creatingProduct,
    deletingProduct,
    updatingProduct,
    products
  } = prop

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    adminFetchProducts()
  }, [])

  return (
    <div>
      <h1>ADMIN DASHBOARD PAGE</h1>
      <h2>PRODUCT LIST</h2>
      {products.map(product => (
        <div key={product.id}>
          <img src={product.imageUrl} alt="product-img" height="150" />
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.description}</div>
          <button type="button" onClick={() => deletingProduct(product)}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  )
}

const mapState = state => {
  return {products: state.adminDashboardReducer.all}
}

const mapDispatch = dispatch => {
  return {
    adminFetchProducts: () => dispatch(adminFetchProductsThunk()),
    creatingProduct: product => {
      dispatch(createProductThunk(product))
    },
    deletingProduct: product => {
      dispatch(deleteProductThunk(product))
    },
    updatingProduct: product => dispatch(updateProductThunk(product))
  }
}

export default connect(mapState, mapDispatch)(AdminDashboard)
