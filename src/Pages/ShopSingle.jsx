import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Container from '../Components/ui/Container'
import ProductGallery from '../Components/shopSingle/ProductGallery'

// TEMPORARY version: it only fetches the product and shows the gallery.
// ProductInfo, ProductTabs and RelatedProducts will be added here step by step.
const ShopSingle = () => {
  // Reads ":id" from the URL, e.g. /shop/5 -> id = "5"
  const { id } = useParams()

  // The result remembers WHICH id it belongs to.
  // This way "loading" can be calculated (id differs) instead of calling
  // setState synchronously inside the effect.
  const [result, setResult] = useState({ id: null, product: null, error: false })

  useEffect(() => {
    // "ignore" stops an old, slow request from overwriting a newer product
    // when the user quickly moves from one product to another.
    let ignore = false

    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!ignore) setResult({ id, product: res.data, error: false })
      })
      .catch(() => {
        if (!ignore) setResult({ id, product: null, error: true })
      })

    return () => {
      ignore = true
    }
  }, [id])

  const isLoading = result.id !== id
  const product = result.product

  // Loading / error states (kept plain, no design from Figma for these)
  if (isLoading) {
    return <main className='mt-30 text-center font-jost'>Loading...</main>
  }
  if (result.error || !product) {
    return <main className='mt-30 text-center font-jost'>Product not found</main>
  }

  return (
    <main className='mt-15 md:mt-20 md:pt-8.5'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`Uomo | ${product.title}`}</title>
      </Helmet>

      <Container>
        {/* Gallery column is 810px wide on desktop (90 thumb + 10 gap + 710 image) */}
        <div className='md:max-w-202.5'>
          <ProductGallery images={product.images} title={product.title} />
        </div>
      </Container>
    </main>
  )
}

export default ShopSingle
