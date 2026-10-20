import { useSyncExternalStore } from 'react'

const CART_EVENT = 'uomo-cart-updated'
const STORAGE_KEY = 'uomo-cart'

const readCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const writeCart = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent(CART_EVENT))
}

export const getCartItems = () => readCart()

export const addToCart = (product, quantity = 1) => {
  const currentItems = readCart()
  const existingItem = currentItems.find((item) => item.id === product.id)

  const nextItems = existingItem
    ? currentItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    : [
        ...currentItems,
        {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity,
          image: product.thumbnail || product.images?.[0] || '',
          color: product.color || product.meta?.color || '',
          size: product.size || '',
          stock: product.stock || 99,
        },
      ]

  writeCart(nextItems)
}

export const updateCartQuantity = (id, change) => {
  const nextItems = readCart()
    .map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(
              item.stock || 99,
              Math.max(1, item.quantity + change)
            ),
          }
        : item
    )

  writeCart(nextItems)
}

export const removeFromCart = (id) => {
  writeCart(readCart().filter((item) => item.id !== id))
}

export const subscribeToCart = (callback) => {
  window.addEventListener(CART_EVENT, callback)
  window.addEventListener('storage', callback)

  return () => {
    window.removeEventListener(CART_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

// Total quantity of all items in the cart (sum of quantities, not number of lines)
export const getCartCount = () =>
  readCart().reduce((total, item) => total + (Number(item.quantity) || 0), 0)

// Hook: returns the live cart count and re-renders on every cart change
export const useCartCount = () =>
  useSyncExternalStore(subscribeToCart, getCartCount, () => 0)
