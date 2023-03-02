import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'

const CheckoutGrid = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 w-full h-[88%]'>
      <LeftColumn />
      <RightColumn />
    </section>
  )
}

export default CheckoutGrid
