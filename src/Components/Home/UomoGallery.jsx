import React from 'react'
import Container from '../ui/Container'
import g1 from '../../assets/images/g1.jpg'
import g2 from '../../assets/images/g2.jpg'
import g3 from '../../assets/images/g3.jpg'
import g4 from '../../assets/images/g4.jpg'
import g5 from '../../assets/images/g5.jpg'
import g6 from '../../assets/images/g6.jpg'
import g7 from '../../assets/images/g7.jpg'
import g8 from '../../assets/images/g8.jpg'
import g9 from '../../assets/images/g9.jpg'
import g10 from '../../assets/images/g10.jpg'
import g11 from '../../assets/images/g11.jpg'
import g12 from '../../assets/images/g12.jpg'


import Image from '../common/Image'

// One entry per gallery tile. To use a different picture for a tile,
// import it above and put it in that tile's "src".
const GALLERY_IMAGES = [
  { id: 1, src: g1 },
  { id: 2, src: g2 },
  { id: 3, src: g3 },
  { id: 4, src: g4 },
  { id: 5, src: g5 },
  { id: 6, src: g6 },
  { id: 7, src: g7 },
  { id: 8, src: g8 },
  { id: 9, src: g9 },
  { id: 10, src: g10 },
  { id: 11, src: g11 },
  { id: 12, src: g12 },
]

const UomoGallery = () => {
  return (
    <>
    <section className='pb-12.25 md:pb-25.5'>
        <Container>
            {/* Side padding between 768px and 1470px so images do not touch the screen edges */}
            <div className='md:px-7.5 min-[1470px]:px-0'>
            <h2 className='text-center font-jost font-normal text-primary-black text-[26px] md:text-[35px] pb-8.5'>@UOMO</h2>
            <div className='grid-cols-3 md:grid-cols-6 grid gap-3.75 md:gap-1.5'>
                {GALLERY_IMAGES.map((item) => (
                  // group + relative + overflow-hidden: zoom and overlay both stay inside the tile
                  <div key={item.id} className="group relative overflow-hidden">
                    {/* block removes the inline baseline gap under the image */}
                    <Image className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-105" src={item.src} alt={`UOMO gallery ${item.id}`}></Image>
                    {/* very light black overlay, visible only on hover; does not block clicks */}
                    <div className="pointer-events-none absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>
                ))}
            </div>
            </div>
        </Container>
    </section>
    </>
  )
}

export default UomoGallery
