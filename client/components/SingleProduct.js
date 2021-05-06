import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {addProductToCartThunk} from '../store/guestShoppingCart'
import {addProductToUserCartThunk} from '../store/userShoppingCart'

const SingleProduct = props => {
  const {
    fetchSingleProduct,
    addProductToGuestCart,
    addProductToUserCart,
    userId,
    product
  } = props
  const singleProduct = product.single

  useEffect(() => {
    fetchSingleProduct(props.match.params.id)
  }, [])

  return (
    <div className="single-product-container">
      <img
        src={
          singleProduct.singleInfoImageUrl
            ? singleProduct.singleInfoImageUrl
            : singleProduct.imageUrl
        }
        className="single-product-img"
      />
      <div>
        <div className="single-product-info-container">
          <div className="single-product-name">{singleProduct.name}</div>
          <div className="single-product-price">
            Price: ${singleProduct.price}
          </div>
          <div className="single-product-desc">
            Description: {singleProduct.description}
          </div>
        </div>
        {!userId ? (
          <button
            className="order-btn"
            type="submit"
            onClick={() => addProductToGuestCart(singleProduct)}
          >
            ORDER
          </button>
        ) : (
          <button
            className="order-btn"
            type="submit"
            onClick={() => addProductToUserCart(singleProduct, userId)}
          >
            ORDER
          </button>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    product: state.productReducer,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchProduct(id)),
    addProductToGuestCart: product => dispatch(addProductToCartThunk(product)),
    addProductToUserCart: (product, userId) =>
      dispatch(addProductToUserCartThunk(product, userId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
