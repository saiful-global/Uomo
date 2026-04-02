import { CategoryData } from '../../../api/CategoryData'
import Container from '../../ui/Container'
import Card from './Card'


const Category = () => {
  return (
  <>
  <section className='mt-25.25'>
    <Container>
      <div className='grid grid-cols-4 grid-rows-2 h-150 gap-7.5'>
        {
          CategoryData?.map((item)=> (
            <Card item={item}></Card>
          ))
        }
      </div>
    </Container>
  </section>
  </>
  )
}

export default Category