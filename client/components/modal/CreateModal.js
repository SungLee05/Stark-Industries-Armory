import React from 'react'

const CreateModal = ({hideModal, toggleModal, children}) => {
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

export default CreateModal
