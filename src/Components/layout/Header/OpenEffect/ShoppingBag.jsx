import React, { useEffect, useMemo, useState } from 'react'

const initialItems = [
  {
    id: 1,
    name: 'Zessi Dresses',
    color: 'Yellow',
    size: 'L',
    price: 99,
    quantity: 1,
    image: 'https://cdn.dummyjson.com/product-images/womens-dresses/black-women-s-gown/1.webp',
  },
  {
    id: 2,
    name: 'Kirby T-Shirt',
    color: 'Yellow',
    size: 'L',
    price: 99,
    quantity: 1,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-and-black-check-shirt/1.webp',
  },
  {
    id: 3,
    name: 'Cableknit Shawl',
    color: 'Yellow',
    size: 'L',
    price: 99,
    quantity: 1,
    image: 'https://cdn.dummyjson.com/product-images/womens-dresses/black-women-s-gown/1.webp',
  },
]

const ShoppingBag = ({ isOpen, onClose }) => {
  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const updateQuantity = (id, change) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  )

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  )

  if (!isOpen) return null

  return (
    <>
      {/* Background overlay */}
      <button
        type="button"
        aria-label="Close shopping bag"
        onClick={onClose}
        className="fixed inset-0 z-[60] h-full w-full cursor-default bg-black/35"
      />

      {/* Shopping bag drawer */}
      <aside
        aria-label="Shopping bag"
        className="fixed right-0 top-0 z-[70] flex h-screen w-full max-w-[430px] flex-col bg-white font-jost"
      >
        {/* Header */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-bg-footer px-6 md:px-9">
          <h2 className="text-sm font-medium uppercase leading-6 text-primary-black">
            Shopping Bag ({itemCount})
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="flex h-7 w-7 items-center justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.414336 14.1421L14.5565 0L15.9707 1.41421L1.82855 15.5563L0.414336 14.1421Z"
                fill="#222222"
              />
              <path
                d="M1.41421 0.142113L15.5563 14.2842L14.1421 15.6985L0 1.55633L1.41421 0.142113Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>

        {/* Products */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 md:px-9">
          {items.length > 0 ? (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative flex gap-4 border-b border-bg-footer py-6"
                >
                  {/* Product image */}
                  <div className="h-[110px] w-[110px] shrink-0 overflow-hidden bg-[#eeeeee]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product information */}
                  <div className="min-w-0 flex-1 pr-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-normal leading-6 text-primary-black">
                        {item.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="absolute right-0 top-6 text-secondColor"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.31066 10.8107L10.8107 0.31066L11.6893 1.18934L1.18934 11.6893L0.31066 10.8107Z"
                            fill="#777777"
                          />
                          <path
                            d="M1.18934 0.31066L11.6893 10.8107L10.8107 11.6893L0.31066 1.18934L1.18934 0.31066Z"
                            fill="#777777"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-0.5 text-xs leading-5 text-secondColor">
                      Color: <span className="text-secondColor">{item.color}</span>
                    </p>

                    <p className="text-xs leading-5 text-secondColor">
                      Size: <span className="text-secondColor">{item.size}</span>
                    </p>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-secondColor">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="text-sm"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="text-sm"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-normal text-primary-black">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-secondColor">Your shopping bag is empty.</p>
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="shrink-0 border-t border-bg-footer px-6 pb-7 pt-5 md:px-9">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium uppercase text-primary-black">
              Subtotal:
            </span>
            <span className="text-sm font-medium text-primary-black">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="grid gap-4">
            <button
              type="button"
              className="h-[55px] bg-[#e9e9e9] text-sm font-medium uppercase text-primary-black transition hover:bg-[#dddddd]"
            >
              View Cart
            </button>

            <button
              type="button"
              className="h-[55px] bg-primary-black text-sm font-medium uppercase text-primary-white transition hover:opacity-90"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default ShoppingBag
