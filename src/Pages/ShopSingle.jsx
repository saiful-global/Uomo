import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Container from '../Components/ui/Container'
import ProductGallery from '../Components/shopSingle/ProductGallery'
import ProductInfo from '../Components/shopSingle/ProductInfo'
import ProductTabs from '../Components/shopSingle/ProductTabs'

// Single product page.
// Built so far: Gallery + Info + Tabs. RelatedProducts will be added at the bottom later.
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
    <main className='mt-15 md:mt-20 md:pt-8.5 pb-12.5 md:pb-25'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{`Uomo | ${product.title}`}</title>
      </Helmet>

      <Container>
        {/* Desktop: gallery 810px + 60px gap + info 540px (same 3fr / 2fr ratio at 1410px).
            Mobile: one column, gallery first, info below. */}
        <div className='grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-15'>
          <ProductGallery images={product.images} title={product.title} />
          {/* key resets quantity when the product changes */}
          <ProductInfo key={product.id} product={product} />
        </div>

        {/* Gap between the top part and the tabs: 54px mobile, 100px desktop */}
        <div className='mt-13.5 md:mt-25'>
          <ProductTabs key={product.id} product={product} />
        </div>
      </Container>
    </main>
  )
}

export default ShopSingle
