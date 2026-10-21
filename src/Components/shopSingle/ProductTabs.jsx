import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

// Tabs under the product: Description / Additional Information / Reviews.
// Prop: product -> one product object from dummyjson.
//
// NOTE: in ShopSingle use  <ProductTabs key={product.id} product={product} />
// The key resets the active tab and the locally added reviews for every new product.

// ---- Static texts copied from the Figma design (theme sample content) ----
const INTRO_TITLE = 'Sed do eiusmod tempor incididunt ut labore'
const WHY_LIST = [
  'Created by cotton fabric with soft and smooth',
  'Simple, Configurable (e.g. size, color, etc.), bundled',
  'Downloadable/Digital Products, Virtual Products',
]
const NUMBER_LIST = [
  'Create Store-specific attributes on the fly',
  'Simple, Configurable (e.g. size, color, etc.), bundled',
  'Downloadable/Digital Products, Virtual Products',
]
const LINING = '100% Polyester, Main: 100% Polyester.'

const GOLD = '#E8BB44'
const GRAY = '#E4E4E4'

// Floating label: the same pattern that is already used in Login.jsx.
// It moves up when the field is focused OR has a value (placeholder=" " makes that work).
const floatLabel =
  'peer-focus:-top-2.5 peer-focus:left-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary-black peer-focus:bg-primary-white peer-focus:px-1 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary-black peer-not-placeholder-shown:bg-primary-white peer-not-placeholder-shown:px-1'
const labelBase =
  'absolute left-4.25 font-jost font-normal text-sm leading-6 text-secondColor transition-all duration-200 pointer-events-none'
const fieldBase =
  'peer w-full border-2 border-bg-footer pt-4.25 pb-3.5 px-4.25 outline-none focus:border-primary-black text-sm font-jost font-normal leading-6'

// "2020-04-06T..." -> "April 06, 2020"
const formatDate = (value) => {
  const d = new Date(value)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
}

// Round to 1 decimal so values like 12.2300001 look clean
const round1 = (n) => Math.round(Number(n) * 10) / 10

// Read-only row of 5 stars
const Stars = ({ value }) => (
  <div className='flex shrink-0 gap-1.5' aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <FaStar key={n} size={11} color={n <= value ? GOLD : GRAY} />
    ))}
  </div>
)

/* ------------------------------ DESCRIPTION ------------------------------ */
const DescriptionTab = ({ product }) => (
  <div>
    <h3 className='font-jost font-medium text-base leading-7.5 text-primary-black'>{INTRO_TITLE}</h3>
    {/* Real text comes from dummyjson */}
    <p className='mt-5.75 font-jost font-normal text-sm leading-7.5 text-primary-black wrap-break-word'>{product.description}</p>

    {/* Two lists: side by side from md, stacked on phones */}
    <div className='mt-14 md:mt-9 grid grid-cols-1 md:grid-cols-2 gap-y-9 md:gap-x-8'>
      <div>
        <h3 className='font-jost font-medium text-base leading-7.5 text-primary-black'>Why choose product?</h3>
        <ul className='mt-6'>
          {WHY_LIST.map((text) => (
            <li key={text} className='flex items-start font-jost font-normal text-sm leading-7.5 text-primary-black'>
              <span className='size-1.25 shrink-0 rounded-full bg-[#BEBEBE] mt-3.5 ml-0.5 mr-2.5'></span>
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className='font-jost font-medium text-base leading-7.5 text-primary-black'>Sample Number List</h3>
        <ol className='mt-6'>
          {NUMBER_LIST.map((text, i) => (
            <li key={text} className='flex items-start font-jost font-normal text-sm leading-7.5 text-primary-black'>
              <span className='w-4 shrink-0 text-base text-secondColor'>{i + 1}</span>
              {text}
            </li>
          ))}
        </ol>
      </div>
    </div>

    <div className='mt-7 md:mt-9'>
      <h3 className='font-jost font-medium text-base leading-7.5 text-primary-black'>Lining</h3>
      <p className='font-jost font-normal text-sm leading-7.5 text-primary-black'>{LINING}</p>
    </div>
  </div>
)

/* -------------------------- ADDITIONAL INFORMATION ------------------------- */
const AdditionalTab = ({ product }) => {
  const { dimensions } = product
  // Figma rows (Size, Color, Storage) do not exist in dummyjson,
  // so the rows below are the details dummyjson really has. Empty ones are skipped.
  const rows = [
    ['Weight', product.weight != null && `${product.weight} kg`],
    ['Dimensions', dimensions && `${round1(dimensions.width)} x ${round1(dimensions.height)} x ${round1(dimensions.depth)} cm`],
    ['Brand', product.brand],
    ['Warranty', product.warrantyInformation],
    ['Shipping', product.shippingInformation],
    ['Availability', product.availabilityStatus],
    ['Return Policy', product.returnPolicy],
  ].filter(([, value]) => value)

  if (rows.length === 0) {
    return <p className='font-jost text-sm leading-6 text-primary-black'>No additional information.</p>
  }

  return (
    <div>
      {rows.map(([label, value]) => (
        <div key={label} className='flex gap-3 mb-6 md:mb-7.5 last:mb-0'>
          <h4 className='w-28 sm:w-35 shrink-0 font-jost font-medium text-base leading-6 text-primary-black'>{label}</h4>
          <p className='min-w-0 font-jost font-normal text-sm leading-6 text-primary-black wrap-break-word'>{value}</p>
        </div>
      ))}
    </div>
  )
}

/* --------------------------------- REVIEWS -------------------------------- */
// Floating-label field (input or textarea)
const Field = ({ id, label, value, onChange, type = 'text', textarea = false }) => (
  <div className='relative'>
    {textarea ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder=' '
        required
        className={`${fieldBase} h-53 resize-none`}
      />
    ) : (
      <input id={id} type={type} value={value} onChange={onChange} placeholder=' ' required className={fieldBase} />
    )}
    <label
      htmlFor={id}
      className={`${labelBase} ${textarea ? 'top-4.25' : 'top-1/2 -translate-y-1/2'} ${floatLabel}`}
    >
      {label}
    </label>
  </div>
)

const ReviewsTab = ({ product, reviews, onAddReview }) => {
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [remember, setRemember] = useState(false)

  // There is no backend, so a new review only lives in the page state (it disappears on refresh)
  const handleSubmit = (e) => {
    e.preventDefault()
    onAddReview({ reviewerName: name, rating, comment: text, date: new Date().toISOString() })
    setText('')
    setRating(5)
    if (!remember) {
      setName('')
      setEmail('')
    }
  }

  return (
    <div>
      <h3 className='font-jost font-medium text-lg leading-7 text-primary-black'>Reviews</h3>

      {/* Review list */}
      <div className='mt-6.25'>
        {reviews.length === 0 && (
          <p className='font-jost text-sm leading-6 text-secondColor'>There are no reviews yet.</p>
        )}
        {reviews.map((review, i) => (
          <div
            key={i}
            className={`flex gap-4 md:gap-7.5 ${i > 0 ? 'pt-7.25' : ''} ${i < reviews.length - 1 ? 'pb-4.5 border-b border-[#F5F5F5]' : ''}`}
          >
            {/* Grey circle avatar like Figma (smaller on phones) */}
            <div className='size-12 md:size-15 shrink-0 rounded-full bg-bg-footer'></div>
            <div className='flex-1 min-w-0'>
              <div className='flex justify-between items-center gap-3'>
                <p className='min-w-0 font-jost font-normal text-sm leading-6 text-primary-black wrap-break-word'>{review.reviewerName}</p>
                <Stars value={review.rating} />
              </div>
              <p className='font-jost font-normal text-sm leading-6 text-secondColor'>{formatDate(review.date)}</p>
              <p className='mt-4.5 font-jost font-normal text-sm leading-7 text-secondColor wrap-break-word'>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add review form */}
      <form onSubmit={handleSubmit} className='mt-12.5'>
        <h3 className='font-jost font-medium text-lg leading-7 text-primary-black wrap-break-word'>
          Be the first to review “{product.title}”
        </h3>
        <p className='font-jost font-normal text-sm leading-6 text-primary-black'>
          Your email address will not be published. Required fields are marked *
        </p>

        {/* Click a star to choose the rating */}
        <div className='mt-7 flex flex-wrap items-center gap-x-4.5 gap-y-2 font-jost font-normal text-sm leading-6 text-primary-black'>
          <span>Your rating *</span>
          <div className='flex gap-1.5'>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type='button' onClick={() => setRating(n)} aria-label={`Rate ${n} out of 5`} className='p-0.5 cursor-pointer'>
                <FaStar size={11} color={n <= rating ? GOLD : GRAY} />
              </button>
            ))}
          </div>
        </div>

        <div className='mt-6.5'>
          <Field id='review-text' label='Your Review' textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className='mt-7.5'>
          <Field id='review-name' label='Name *' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='mt-7.5'>
          <Field id='review-email' label='Email address *' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <label className='mt-6.5 flex items-start gap-2.5 cursor-pointer font-jost font-normal text-sm leading-6 text-secondColor'>
          <input type='checkbox' checked={remember} onChange={(e) => setRemember(e.target.checked)} className='mt-1 size-4.25 shrink-0 accent-black' />
          Save my name, email, and website in this browser for the next time I comment.
        </label>

        <button type='submit' className='mt-6.5 w-full sm:w-50 h-15 bg-primary-black text-primary-white font-jost font-medium text-sm uppercase cursor-pointer'>
          SUBMIT
        </button>
      </form>
    </div>
  )
}

/* ---------------------------------- MAIN ---------------------------------- */
const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description')
  // Reviews written on this page are added in front of the dummyjson reviews
  const [myReviews, setMyReviews] = useState([])

  const reviews = [...myReviews, ...(product.reviews || [])]

  const tabs = [
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'additional', label: 'ADDITIONAL INFORMATION' },
    { id: 'reviews', label: `REVIEWS (${reviews.length})` },
  ]

  return (
    <section className='min-w-0'>
      {/* Tab buttons. They wrap to a second line on small screens (same as Figma mobile).
          The active one gets a 2px line under it (the ::after element). */}
      <div role='tablist' className='flex flex-wrap justify-center gap-x-8 sm:gap-x-15.75 gap-y-2.75 md:gap-x-12 lg:gap-x-18 mb-5 md:mb-13'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type='button'
              role='tab'
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`relative font-jost font-medium text-sm md:text-base leading-6 uppercase cursor-pointer after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0.75 md:after:-bottom-0.5 after:h-0.5 after:bg-primary-black ${
                isActive ? 'text-primary-black' : 'text-secondColor after:hidden'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content is 930px wide and centered on desktop (like Figma) */}
      <div className='max-w-232.5 mx-auto'>
        {activeTab === 'description' && <DescriptionTab product={product} />}
        {activeTab === 'additional' && <AdditionalTab product={product} />}
        {activeTab === 'reviews' && (
          <ReviewsTab product={product} reviews={reviews} onAddReview={(r) => setMyReviews([r, ...myReviews])} />
        )}
      </div>
    </section>
  )
}

export default ProductTabs
