import React from 'react'

import './Time.css'

export const Time = ({ date }) => {
  let time, day, month // + hours, minutes

  if (date !== null && date !== undefined && date.length > 0 && date !== '') {
    time = new Date(date)
    // hours = time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`
    // minutes =
    //   time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`
    day = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`
    month =
      time.getMonth() > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`
  } else {
    return <span>Дата не установлена</span>
  }

  // let string = `${hours}:${minutes} ${day}.${month}.${time.getFullYear()}`
  let string = `${day}.${month}.${time.getFullYear()}`

  return (
    <>
      <span>{string}</span>
    </>
  )
}
