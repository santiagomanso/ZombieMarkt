import zombie from '../assets/zombie2.png'
import groceries from '../assets/groceries.png'

const HomePage = () => {
  return (
    <section className='lg:px-20 h-5/6 flex mt-5'>
      <aside className='bg-gray-800/20 w-[400px] h-full flex flex-col items-center px-2 lg:px-5 gap-10 py-10'>
        <ul className='h-[300px] bg-gray-800/10 w-full'>
          <li>Filters</li>
        </ul>

        <article className='flex flex-col gap-5 items-center outline outline-4 outline-amber-100/50 relative bg-gradient-to-b from-slate-900 to-amber-100/70  rounded-md p-4 h-[370px]'>
          <img src={zombie} alt='zombie' className='absolute -top-24' />
          <img src={zombie} alt='zombie' className='absolute hidden' />
          <div className='mt-40'>
            <h2 className='font-bold'>Survivor's kit!</h2>
            <span className='text-start'>
              <p className='font-medium'>
                Everything you need to whitstand the infection
              </p>
              <button className='bg-gradient-to-br from-amber-200 to-pink-400 rounded-xl outline outline-2 outline-slate-500 self-center place-self-center'>
                SURVIVE NOW!
              </button>
            </span>
          </div>
        </article>
      </aside>
      <section className='flex gap-60 flex-col bg-black/10 w-full h-full px-10 relative overflow-hidden'>
        <article className='flex'>
          <div className='p-10'>
            <h1 className='text-6xl font-bold'>ZombieMartk groceries</h1>
            <p className='text-3xl mt-2'>
              Where prices are dropped{' '}
              <span className='font-medium text-3xl'>dead</span>
            </p>
            <p className='text-2xl mt-1'>
              Shop now and wait for our curriers to skip through the infected
              mobs
            </p>
            <button className='mt-7 bg-gradient-to-br rounded outline outline-2 outline-gray-400  text-gray-200 font-medium px-10  text-3xl'>
              View groceries
            </button>
            <img
              src={groceries}
              alt='groceries'
              className='w-3/5 top-3 right-0 absolute rotate-2'
            />
          </div>
        </article>
        <ul className='flex gap-10 categories'>
          <li>beverages</li>
          <li>breakfast</li>
          <li>meat</li>
          <li>fruits</li>
          <li>vegetables</li>
          <li>pasta</li>
          <li>hygiene</li>
          <li>hygiene</li>
          <li>hygiene</li>
          <li>hygiene</li>
          <li>hygiene</li>
          <li>hygiene</li>
          <li>hygiene</li>
          <li>hygiene</li>
        </ul>
      </section>
    </section>
  )
}

export default HomePage
