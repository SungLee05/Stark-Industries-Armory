import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import dateFormat from 'dateformat'
import {getOrderHistory} from '../store/orderHistory'
import accounting from 'accounting'
const faker = require('faker')

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
      const trackStatus = () => {}

      dispatch(getOrderHistory(props.match.params.id))
    },
    [getOrderHistory]
  )

  return (
    <div className="order-history-main-container">
      <div className="order-history-wrapper">
        <h1>ORDER HISTORY</h1>
        <div>
          {!history.length ? (
            <div>You have not purchased any of our products.</div>
          ) : (
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
                        return (
                          <div
                            key={product.id}
                            className="order-history-glass-container"
                          >
                            <div className="order-history-subheader-wrapper">
                              <div style={{marginLeft: '9rem', width: '10rem'}}>
                                {product.name}
                              </div>
                              <div style={{marginLeft: '10.25rem'}}>
                                Shipping Info
                              </div>
                              <div style={{marginLeft: '14rem'}}>
                                Package Status
                              </div>
                            </div>

                            <div className="order-history-content-wrapper">
                              <div className="order-history-img-wrapper">
                                <img src={product.imageUrl} height="170" />
                              </div>
                              <div className="order-history-qty-price-wrapper">
                                <div>Qty: {product.orderHistory.quantity}</div>
                                <div>Price: ${product.price}</div>
                              </div>

                              <div className="order-history-address-wrapper">
                                <div>{streetName}</div>
                                <div>
                                  {cityName + ', ' + state + ' ' + zipCode}
                                </div>
                              </div>

                              <div className="order-history-status-wrapper">
                                <div className="track-status-container">
                                  <div className="track-status-wrapper">
                                    <div className="track-status-confirmed">
                                      Confirmed
                                    </div>
                                    <div className="track-status-shipped">
                                      Shipped
                                    </div>
                                    <div className="track-status-delivered">
                                      Delivered
                                    </div>
                                  </div>

                                  <div className="track-status-wrapper">
                                    <div className="track-status-box-left" />
                                    <div className="track-status-box-middle" />
                                    <div className="track-status-box-right" />
                                  </div>
                                </div>

                                <div
                                  style={{
                                    fontSize: '0.8rem',
                                    fontWeight: '400',
                                    textAlign: 'center'
                                  }}
                                >
                                  Estimated Arrival:{' '}
                                  {dateFormat(
                                    estimatedArrivalDate(order.updatedAt, 5),
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
          )}
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    history: state.orderHistoryReducer.history
  }
}

export default connect(mapState)(OrderHistory)
