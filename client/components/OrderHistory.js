import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import dateFormat from 'dateformat'
import {getOrderHistory} from '../store/orderHistory'
import accounting from 'accounting'

const OrderHistory = props => {
  const dispatch = useDispatch()
  const {history} = props

  useEffect(
    () => {
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
                      <div>
                        Order Placed: {dateFormat(order.updatedAt, 'fullDate')}
                      </div>

                      <div>
                        Total:
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
                          <div key={product.id}>
                            <div className="order-history-subheader-wrapper">
                              <div
                                style={{marginLeft: '7.75rem', width: '10rem'}}
                              >
                                {product.name}
                              </div>
                              <div style={{marginLeft: '11.25rem'}}>
                                Shipping Info
                              </div>
                              <div style={{marginLeft: '15rem'}}>
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
                                <div>ADDRESS HERE</div>
                              </div>

                              <div className="order-history-status-wrapper">
                                <div>PACKAGE STATUS HERE</div>
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
