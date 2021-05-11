import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Tilt from 'react-tilt'
import {fetchProduct} from '../store/singleProduct'
import {addProductToCartThunk} from '../store/guestShoppingCart'
import {addProductToUserCartThunk} from '../store/userShoppingCart'

import {Link} from 'react-router-dom'
import {BsChevronDoubleLeft} from 'react-icons/bs'
import accounting from 'accounting'

import Flip from 'react-reveal/Flip'
import Fade from 'react-reveal/Fade'

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
        <img src="/gifs/jarvisGIF2.gif" alt="jarvis" id="jarvis" />
      </div>
      <div className="single-product-container">
        <Fade ssrReveal={true} duration={2000} delay={1100}>
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
        </Fade>

        <Fade ssrReveal={true}>
          <div className="single-product-glass">
            <div className="text-container">
              <div className="single-product-info-container">
                <Flip
                  ssrReveal={true}
                  bottom
                  cascade={true}
                  duration={1500}
                  delay={1300}
                >
                  <div className="single-product-name">
                    {singleProduct.name}
                  </div>
                </Flip>

                <div className="single-product-desc">
                  <Flip ssrReveal={true} top delay={1150}>
                    Description:{' '}
                  </Flip>
                  <Flip
                    ssrReveal={true}
                    bottom
                    cascade={true}
                    duration={1100}
                    delay={1200}
                  >
                    {singleProduct.description}
                  </Flip>
                </div>
              </div>

              <div className="single-product-price">
                <Flip ssrReveal={true} top duration={1500} delay={1400}>
                  Price:
                </Flip>
                <Flip
                  ssrReveal={true}
                  bottom
                  cascade={true}
                  duration={1500}
                  delay={1400}
                >
                  {accounting.formatMoney(singleProduct.price)}
                </Flip>
              </div>

              {!userId ? (
                <Flip ssrReveal={true} top duration={1500} delay={1500}>
                  <button
                    className="order-btn"
                    type="submit"
                    onClick={() => addProductToGuestCart(singleProduct)}
                  >
                    ORDER
                  </button>
                </Flip>
              ) : (
                <Flip ssrReveal={true} top duration={1500} delay={1500}>
                  <button
                    className="order-btn"
                    type="submit"
                    onClick={() => addProductToUserCart(singleProduct, userId)}
                  >
                    ORDER
                  </button>
                </Flip>
              )}

              <div className="single-product-back-link-container">
                <Link
                  className="single-product-cart-back-link"
                  to="/allproducts"
                >
                  <Flip top duration={1500} delay={1500}>
                    <BsChevronDoubleLeft />
                    <div className="single-product-cart-back-btn">
                      Back to Armory
                    </div>
                  </Flip>
                </Link>
              </div>
            </div>
          </div>
        </Fade>
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
