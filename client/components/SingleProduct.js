import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Tilt from 'react-tilt'
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
    <>
      <div id="jarvis-container">
        <img src="/jarvisGIF2.gif" alt="jarvis" id="jarvis" />
      </div>
      <div className="single-product-container">
        <div className="product-img-container">
          <Tilt
            options={{
              max: 30,
              speed: 1000,
              transition: true,
              perspective: 500,
              easing: 'cubic-bezier(.03,.98,.52,.99)'
            }}
            className="product-img-card"
            style={{padding: 0}}
          >
            <img
              src={
                singleProduct.singleInfoImageUrl
                  ? singleProduct.singleInfoImageUrl
                  : singleProduct.imageUrl
              }
              className="single-product-img"
            />
          </Tilt>
        </div>

        <div className="single-product-glass">
          <div className="text-container">
            <div className="single-product-info-container">
              <div className="single-product-name">{singleProduct.name}</div>
              <div className="single-product-desc">
                Description: {singleProduct.description}
              </div>
            </div>
            <div className="single-product-price">
              Price: ${singleProduct.price}
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
      </div>
    </>
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
