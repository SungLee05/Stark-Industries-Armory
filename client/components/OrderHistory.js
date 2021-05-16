import React, {useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import dateFormat from 'dateformat'
import {getOrderHistory} from '../store/orderHistory'

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
    <div className="orderhistory-main-container">
      <div className="orderhistory-wrapper">
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
                    <div>
                      Purchase Date: {dateFormat(order.updatedAt, 'fullDate')}
                    </div>
                    <div>
                      {order.products.map(product => {
                        return (
                          <div key={product.id}>
                            <div>Name: {product.name}</div>
                            <div>Price: ${product.price}</div>
                            <div>Quantity: {product.orderHistory.quantity}</div>
                            <img src={product.imageUrl} height="300" />
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
