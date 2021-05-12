import React, {useState} from 'react'

const Clock = () => {
  let time = new Date().toLocaleTimeString('en-GB')

  const [timeClock, setTimeClock] = useState(time)

  const updateTime = () => {
    time = new Date().toLocaleTimeString('en-GB')
    setTimeClock(time)
  }

  setInterval(updateTime, 1000)

  return (
    <>
      <div>{timeClock}</div>
    </>
  )
}

export default Clock
