import React from 'react'

const DateVal = ({date}) => {
    let val =  new Date(date)
  const monthObj = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    
  return (
    <div>
      {monthObj[val.getMonth()]} {val.getDate()}, {val.getFullYear()}
    </div>
  )
}

export default DateVal
