import React from 'react'
import { useParams } from 'react-router'

// TEMPORARY placeholder.
// It only exists so the import in App.jsx does not break the build.
// This whole file will be replaced by the real ShopSingle page later.
const ShopSingle = () => {
  // Reads ":id" from the URL, e.g. /shop/5 -> id = "5"
  const { id } = useParams()

  return (
    <main className='mt-30 md:mt-30 text-center font-jost'>
      Shop Single page coming soon (product id: {id})
    </main>
  )
}

export default ShopSingle
