import React from 'react'

const Listitem = ({children,className,onCick}) => {
  return (
    <>
    <li onClick={onCick} className={className}>{children}</li>
    </>
  )
}

export default Listitem