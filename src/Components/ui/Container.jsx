import React from 'react'

const Container = ({children,className}) => {
  return (
    <div className={`max-w-352.5 mx-auto px-3.75 md:px-0 ${className}`}>{children}</div>
  )
}

export default Container