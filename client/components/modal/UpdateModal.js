import React from 'react'

const UpdateModal = ({hideUpdateModal, toggleUpdateModal, children}) => {
  if (hideUpdateModal) return null

  return (
    <>
      <div onClick={() => toggleUpdateModal()} />
      <div>
        <div>{children}</div>
      </div>
    </>
  )
}

export default UpdateModal
