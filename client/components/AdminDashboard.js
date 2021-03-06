import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
  adminFetchProductsThunk,
  deleteProductThunk,
  createProductThunk,
  updateProductThunk
} from '../store/adminDashboard'
import CreateModal from '../components/modal/CreateModal'
import UpdateModal from '../components/modal/UpdateModal'

const AdminDashboard = props => {
  const {
    adminFetchProducts,
    creatingProduct,
    deletingProduct,
    updatingProduct,
    products
  } = props

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [hideModal, setHideModal] = useState(true)
  const [hideUpdateModal, setHideUpdateModal] = useState(true)
  const [productId, setProductId] = useState(0)

  useEffect(() => {
    adminFetchProducts()
  }, [])

  const toggleModal = () => setHideModal(!hideModal)
  const configModal = {
    hideModal,
    toggleModal
  }

  const toggleUpdateModal = () => setHideUpdateModal(!hideUpdateModal)
  const configUpdateModal = {
    hideUpdateModal,
    toggleUpdateModal
  }

  const resetForm = () => {
    setHideModal(true)
    setHideUpdateModal(true)
    setName('')
    setImageUrl('')
    setPrice(0)
    setDescription('')
    setProductId(0)
  }

  const handleSubmit = event => {
    event.preventDefault()
    creatingProduct({
      name,
      price,
      imageUrl,
      description
    })
    resetForm()
  }

  const handleSubmitForUpdate = event => {
    event.preventDefault()
    updatingProduct({
      name,
      price,
      imageUrl,
      description,
      productId
    })
    resetForm()
  }

  return (
    <div>
      <h1>ADMIN DASHBOARD PAGE</h1>
      <h2>PRODUCT LIST</h2>

      <div>
        <button type="button" onClick={() => toggleModal()}>
          Add New products
        </button>
      </div>

      <CreateModal {...configModal}>
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <div>
              <label>name</label>
              <input
                style={{height: '2.2rem'}}
                label="Product Name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div>
              <label>Image Url</label>
              <input
                style={{height: '2.2rem'}}
                label="Product Image URL"
                type="url"
                value={imageUrl}
                onChange={event => setImageUrl(event.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                style={{height: '2.2rem'}}
                label="USD"
                type="number"
                min="0.00"
                max="1000000.00"
                step="0.01"
                value={price}
                onChange={event => setPrice(event.target.value)}
              />
            </div>
            <br />
            <div>
              <label>Description</label>
              <input
                style={{width: '30rem', height: '15rem'}}
                label="Product Description"
                type="text"
                value={description}
                onChange={event => {
                  setDescription(event.target.value)
                }}
              />
            </div>
            <br />
            <button type="submit">Add product</button>
          </form>
        </div>
      </CreateModal>

      <UpdateModal {...configUpdateModal}>
        <div>
          <form onSubmit={handleSubmitForUpdate}>
            <h2>Update Product</h2>
            <div>
              <label>name</label>
              <input
                style={{height: '2.2rem'}}
                label="Product Name"
                type="text"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div>
              <label>Image Url</label>
              <input
                style={{height: '2.2rem'}}
                label="Product Image URL"
                type="url"
                value={imageUrl}
                onChange={event => setImageUrl(event.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                style={{height: '2.2rem'}}
                label="USD"
                type="number"
                min="0.00"
                max="1000000.00"
                step="0.01"
                value={price}
                onChange={event => setPrice(event.target.value)}
              />
            </div>
            <br />
            <div>
              <label>Description</label>
              <input
                style={{width: '30rem', height: '15rem'}}
                label="Product Description"
                type="text"
                value={description}
                onChange={event => {
                  setDescription(event.target.value)
                }}
              />
            </div>
            <br />
            <button type="submit">Update Product</button>
          </form>
        </div>
      </UpdateModal>

      {!products ? (
        <div>Loading...</div>
      ) : (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <img src={product.imageUrl} alt="product-img" height="150" />
              <div>{product.name}</div>
              <div>${product.price}</div>
              <div>{product.description}</div>
              <button type="button" onClick={() => deletingProduct(product)}>
                DELETE
              </button>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setProductId(product.id)
                    toggleUpdateModal()
                  }}
                >
                  Update products
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
