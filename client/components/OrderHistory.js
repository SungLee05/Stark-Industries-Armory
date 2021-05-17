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
                        total:
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
                              <div>{product.name}</div>
                              <div>Shipping Info</div>
                              <div>Package Status</div>
                            </div>

                            <div className="order-history-content-wrapper">
                              <img src={product.imageUrl} height="300" />

                              <div className="order-history-qty-price-wrapper">
                                <div>
                                  Quantity: {product.orderHistory.quantity}
                                </div>
                                <div>Price: ${product.price}</div>
                              </div>

                              <div>ADDRESS HERE</div>
                              <div>PACKAGE STATUS HERE</div>
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
