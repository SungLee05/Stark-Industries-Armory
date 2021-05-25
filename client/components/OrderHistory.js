/* eslint-disable complexity */
import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import dateFormat from 'dateformat'
import {getOrderHistory} from '../store/orderHistory'

import {BsChevronDoubleLeft} from 'react-icons/bs'
import accounting from 'accounting'
const faker = require('faker')
import Fade from 'react-reveal/Fade'

const OrderHistory = props => {
  const dispatch = useDispatch()
  const {history} = props
  const streetName = faker.address.streetAddress()
  const cityName = faker.address.cityName()
  const state = faker.address.stateAbbr()
  const zipCode = faker.address.zipCode()

  const estimatedArrivalDate = (date, days) => {
    let result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  useEffect(
    () => {
      dispatch(getOrderHistory(props.match.params.id))
    },
    [getOrderHistory]
  )

  return (
    <>
      <div className="ironman-OH-wallpaper-container">
        <img
          className="ironman-OH"
          src="/images/order-history-wallpaper.jpeg"
        />
      </div>

      <div className="order-history-main-container">
        <div className="order-history-wrapper">
          <div>
            {!history.length ? (
              <div className="order-history-empty-container">
                <Fade bottom delay={1100}>
                  <div className="order-history-empty">
                    No orders have been made for your account.
                  </div>
                  <Link
                    className="cart-back-link"
                    id="cart-back-link-OH"
                    to="/allproducts"
                  >
                    <BsChevronDoubleLeft />
                    <div className="cart-back-btn">Back to Armory</div>
                  </Link>
                </Fade>
              </div>
            ) : (
              <>
                <h1>ORDER HISTORY</h1>
                <div>
                  {history.map(order => {
                    return (
                      <div key={order.id}>
                        <br />

                        <div className="order-history-header-wrapper">
                          <div style={{marginLeft: '1rem'}}>
                            Order Placed:{' '}
                            {dateFormat(order.updatedAt, 'mmm d, yyyy')}
                          </div>

                          <div style={{marginRight: '1rem'}}>
                            Total:{' '}
                            {accounting.formatMoney(
                              order.products.reduce(
                                (acc, product) =>
                                  acc +
                                  product.price * product.orderHistory.quantity,
                                0
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          {order.products.map(product => {
                            const estimatedArrivalTime = estimatedArrivalDate(
                              order.updatedAt,
                              5
                            )
                            const oneDayInMs = 86400000

                            const confirmedBorderColor =
                              new Date(order.updatedAt).getTime() + oneDayInMs >
                              new Date().getTime()
                                ? '10px solid #fbca03'
                                : '10px solid rgb(75,75,75)'

                            const confirmedColor =
                              new Date(order.updatedAt).getTime() + oneDayInMs >
                              new Date().getTime()
                                ? '#fbca03'
                                : 'rgb(75,75,75)'

                            const shippedBorderColor =
                              new Date(order.updatedAt).getTime() + oneDayInMs <
                                new Date().getTime() &&
                              new Date().getTime() <
                                estimatedArrivalTime.getTime()
                                ? '10px solid #fbca03'
                                : '10px solid rgb(75,75,75)'

                            const shippedColor =
                              new Date(order.updatedAt).getTime() + oneDayInMs <
                                new Date().getTime() &&
                              new Date().getTime() <
                                estimatedArrivalTime.getTime()
                                ? '#fbca03'
                                : 'rgb(75,75,75)'

                            const deliveredBorderColor =
                              estimatedArrivalTime.getTime() <
                              new Date().getTime()
                                ? '10px solid #fbca03'
                                : '10px solid rgb(75,75,75)'

                            const deliveredColor =
                              estimatedArrivalTime.getTime() <
                              new Date().getTime()
                                ? '#fbca03'
                                : 'rgb(75,75,75)'

                            const textColor =
                              estimatedArrivalTime.getTime() <
                              new Date().getTime()
                                ? 'transparent'
                                : 'rgba(255, 255, 255, 0.8)'

                            return (
                              <div
                                key={product.id}
                                className="order-history-glass-container"
                              >
                                <div className="order-history-content-wrapper">
                                  <div className="order-history-img-wrapper">
                                    <img src={product.imageUrl} height="170" />
                                  </div>
                                  <div className="order-history-qty-price-wrapper">
                                    <div className="order-history-subheader">
                                      {product.name}
                                    </div>

                                    <div className="OH-info-container">
                                      <div>
                                        Qty: {product.orderHistory.quantity}
                                      </div>
                                      <div>
                                        Price:{' '}
                                        {accounting.formatMoney(product.price)}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="order-history-address-wrapper">
                                    <div className="order-history-subheader-shipping">
                                      Shipping Info
                                    </div>

                                    <div className="OH-info-container-address">
                                      <div>{streetName}</div>
                                      <div>
                                        {cityName +
                                          ', ' +
                                          state +
                                          ' ' +
                                          zipCode}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="order-history-status-wrapper">
                                    <div id="OH-package-status-title">
                                      Package Status
                                    </div>

                                    <div className="track-status-container">
                                      <div className="track-status-wrapper">
                                        <div
                                          className="track-status-confirmed"
                                          style={{
                                            color: confirmedColor
                                          }}
                                        >
                                          Confirmed
                                        </div>

                                        <div
                                          className="track-status-shipped"
                                          style={{
                                            color: shippedColor
                                          }}
                                        >
                                          Shipped
                                        </div>

                                        <div
                                          id="track-status-delivered"
                                          style={{
                                            color: deliveredColor
                                          }}
                                        >
                                          Delivered
                                        </div>
                                      </div>

                                      <div className="track-status-wrapper">
                                        <div
                                          className="track-status-box-left"
                                          style={{
                                            backgroundColor: confirmedColor
                                          }}
                                        />
                                        <div
                                          id="track-status-box-left-after"
                                          style={{
                                            borderLeft: confirmedBorderColor
                                          }}
                                        />

                                        <div
                                          id="track-status-box-middle-before"
                                          style={{
                                            borderTop: shippedBorderColor,
                                            borderBottom: shippedBorderColor
                                          }}
                                        />
                                        <div
                                          className="track-status-box-middle"
                                          style={{
                                            backgroundColor: shippedColor
                                          }}
                                        />
                                        <div
                                          id="track-status-box-middle-after"
                                          style={{
                                            borderLeft: shippedBorderColor
                                          }}
                                        />

                                        <div
                                          id="track-status-box-right"
                                          style={{
                                            backgroundColor: deliveredColor
                                          }}
                                        />
                                        <div
                                          id="track-status-box-right-after"
                                          style={{
                                            borderTop: deliveredBorderColor,
                                            borderBottom: deliveredBorderColor
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        fontSize: '0.8rem',
                                        fontWeight: '400',
                                        textAlign: 'center',
                                        color: textColor
                                      }}
                                    >
                                      Estimated Arrival:{' '}
                                      {dateFormat(
                                        estimatedArrivalTime,
                                        'ddd, mmm d'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const mapState = state => {
  return {
    history: state.orderHistoryReducer.history
  }
}

export default connect(mapState)(OrderHistory)
