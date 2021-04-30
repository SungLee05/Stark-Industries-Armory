import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'
import {addProductToCartThunk} from '../store/guestShoppingCart'

const SingleProduct = props => {
  const {fetchSingleProduct, addProductToGuestCart, userId, product} = props
  const singleProduct = product.single

  useEffect(() => {
    fetchSingleProduct(props.match.params.id)
  }, [])

  return (
    <div>
      <h1>SINGLE PRODUCT PAGE</h1>

      <img src={singleProduct.imageUrl} height="200" />
      <div className="singletext">
        Name: {singleProduct.name}
        <br />
        Price: {singleProduct.price}
        <br />
        Description: {singleProduct.description}
        <br />
        {!userId ? (
          <button
            type="submit"
            onClick={() => addProductToGuestCart(singleProduct)}
          >
            ORDER
          </button>
        ) : (
          <button
            type="submit"
            onClick={() => console.log('userCart clicked!')}
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
    addProductToGuestCart: product => dispatch(addProductToCartThunk(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
