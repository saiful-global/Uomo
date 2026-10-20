import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../common/Product'

const RelatedProducts = ({ product }) => {
  const [result, setResult] = useState({
    category: null,
    products: [],
    error: false,
  })

  useEffect(() => {
    let ignore = false

    axios
      .get('https://dummyjson.com/products?limit=200')
      .then((res) => {
        if (ignore) return

        const allProducts = res.data.products || []

        const sameCategory = allProducts.filter(
          (item) => item.id !== product.id && item.category === product.category
        )

        const otherProducts = allProducts.filter(
          (item) => item.id !== product.id && item.category !== product.category
        )

        const related = [...sameCategory, ...otherProducts].slice(0, 4)

        setResult({
          category: product.category,
          products: related,
          error: false,
        })
      })
      .catch(() => {
        if (!ignore) {
          setResult({
            category: product.category,
            products: [],
            error: true,
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [product.id, product.category])

  const isLoading = result.category !== product.category

  if (isLoading || result.error || result.products.length === 0) {
    return null
  }

  return (
    <section className='mt-18 md:mt-25'>
      <h2 className='font-jost text-primary-black text-base md:text-lg font-medium leading-6 uppercase mb-7.5 md:mb-10'>
        RELATED <span className='font-bold'>PRODUCTS</span>
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-4'>
        {result.products.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
