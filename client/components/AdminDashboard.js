import React, {useEffect} from 'react'
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
    updatingProduct
  } = prop

  useEffect(() => {
    adminFetchProducts()
  }, [])

  return (
    <div>
      <h1>ADMIN DASHBOARD PAGE</h1>
      <p>user profile list</p>
      <div>UPDATE TEST</div>
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
