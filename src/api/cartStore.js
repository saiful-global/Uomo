import { useMemo, useSyncExternalStore } from 'react'

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

// Empty the whole cart (used after an order is placed)
export const clearCart = () => writeCart([])

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

// ---- Placed orders (no backend, kept in localStorage so Order Tracking can find them) ----
const ORDERS_KEY = 'uomo-orders'

const readOrders = () => {
  try {
    const saved = localStorage.getItem(ORDERS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Save an order once (same order number is never saved twice)
export const saveOrder = (order) => {
  const orders = readOrders()
  if (orders.some((o) => String(o.orderNumber) === String(order.orderNumber))) return
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, order]))
  } catch {
    // storage full or blocked: tracking just will not find this order
  }
}


export const getOrders = () => readOrders()

// Find an order by Order ID + billing email.
// The billing email is optional at checkout, so if the order has no email only the Order ID is checked.
export const findOrder = (orderNumber, email) =>
  readOrders().find((o) => {
    if (String(o.orderNumber) !== String(orderNumber).trim()) return false
    const savedEmail = (o.billing?.email || '').trim().toLowerCase()
    return !savedEmail || savedEmail === String(email).trim().toLowerCase()
  })

// ---- Wishlist (no backend, kept in localStorage) ----
// Each item: { id, name, category, price, image }
const WISHLIST_KEY = 'uomo-wishlist'
const WISHLIST_EVENT = 'uomo-wishlist-updated'

// The raw JSON text is the snapshot for useSyncExternalStore (a string is compared by value, so no infinite loop)
const readWishlistRaw = () => {
  try {
    return localStorage.getItem(WISHLIST_KEY) || '[]'
  } catch {
    return '[]'
  }
}

const parseWishlist = (raw) => {
  try {
    const list = JSON.parse(raw)
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

const writeWishlist = (items) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items))
  } catch {
    // storage full or blocked: wishlist just will not be saved
  }
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT))
}

export const getWishlist = () => parseWishlist(readWishlistRaw())

// Add the product if it is not in the wishlist, remove it if it is
export const toggleWishlist = (product) => {
  const items = getWishlist()
  if (items.some((item) => item.id === product.id)) {
    writeWishlist(items.filter((item) => item.id !== product.id))
    return
  }
  writeWishlist([
    ...items,
    {
      id: product.id,
      name: product.title,
      category: product.category || '',
      price: product.price,
      image: product.thumbnail || product.images?.[0] || '',
    },
  ])
}

export const removeFromWishlist = (id) => {
  writeWishlist(getWishlist().filter((item) => item.id !== id))
}

const subscribeToWishlist = (callback) => {
  window.addEventListener(WISHLIST_EVENT, callback)
  window.addEventListener('storage', callback)

  return () => {
    window.removeEventListener(WISHLIST_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

// Hook: returns the live wishlist array and re-renders on every change
export const useWishlist = () => {
  const raw = useSyncExternalStore(subscribeToWishlist, readWishlistRaw, () => '[]')
  return useMemo(() => parseWishlist(raw), [raw])
}
