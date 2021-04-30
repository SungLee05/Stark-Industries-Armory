import React from 'react'

const Modal = ({hideModal, toggleModal, children}) => {
  if (hideModal) return null

  return (
    <>
      <div onClick={() => toggleModal()} />
      <div>
        <div>{children}</div>
      </div>
    </>
  )
}

export default Modal
