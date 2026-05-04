import React from 'react'

const Container = ({children,className}) => {
  return (
    <div className={`max-w-352.5 mx-auto ${className}`}>{children}</div>
  )
}

export default Container