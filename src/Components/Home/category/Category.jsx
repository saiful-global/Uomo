import { CategoryData } from '../../../api/CategoryData'
import Container from '../../ui/Container'
import Card from './Card'


const Category = () => {
  return (
  <>
  <section className='mt-3.75 md:mt-25.25'>
    <Container>
      {/* side padding for tablets/laptops, because Container has no padding from md */}
      <div className='md:px-7.5 min-[1470px]:px-0'>
        {/* mobile: 1 column | md: 2 columns, fixed row height | lg+: original 4x2 grid */}
        <div className='grid gap-3.75 md:grid-cols-2 md:auto-rows-[220px] lg:grid-cols-4 lg:grid-rows-2 lg:auto-rows-auto lg:gap-7.5'>
          {
            CategoryData?.map((item)=> (
              <Card key={item.id} item={item} />
            ))
          }
        </div>
      </div>
    </Container>
  </section>
  </>
  )
}

export default Category
