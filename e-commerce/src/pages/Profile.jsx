import React, { useContext } from 'react'
import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import LeftPanel from '../components/leftPanel/LeftPanel'
import { UserContext } from '../store/UserContext'

const Profile = () => {
  const { user } = useContext(UserContext)
  return (
    <MainContainer>
      <LeftPanel bottomCard />
      <RightContainer justifyCenter>
        {user && (
          <article className='w-full shadow-2xl rounded-lg flex outline outline-1 outline-gray-600 '>
            <div className='w-1/3 h-full bg-gradient-to-tl rounded p-10'>
              <img
                src={user.image}
                alt={user.email}
                className='w-full h-full object-scale-down rounded max-h-[500px]'
              />
            </div>
            <div className='w-2/3 bg-gray-700/10 grid grid-cols-3  p-10 place-content-center gap-20'>
              <div className='flex flex-col'>
                <label className='font-medium' htmlFor='name'>
                  Email
                </label>
                <input
                  // onChange={handleChange}
                  className='outline outline-1 outline-gray-300'
                  type='text'
                  name='name'
                  value={user.email}
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-medium' htmlFor='sku'>
                  Image
                </label>
                <input
                  // onChange={handleChange}
                  className='outline outline-1 outline-gray-300'
                  type='text'
                  name='sku'
                  value={user.image}
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-medium' htmlFor='ean'>
                  Joined on
                </label>
                <input
                  // onChange={handleChange}
                  className='outline outline-1 outline-gray-300'
                  type='text'
                  name='ean'
                  disabled
                  value={user.joined}
                />
              </div>
              <div className='flex flex-col'>
                <button
                  // onChange={handleChange}
                  type='number'
                  name='countInStock'
                  className='flex gap-1 justify-center items-baseline w-full bg-slate-800/60 font-bold text-gray-100 tracking-wider text-lg rounded outline outline-2 outline-slate-500 self-center place-self-center'
                  // value={product.countInStock}
                >
                  <i className='fa-regular fa-heart'></i>
                  <span>Favourites</span>
                </button>
              </div>
              <div className='flex flex-col lg:col-span-1 w-full'>
                <button className='flex gap-1 justify-center items-baseline w-full bg-slate-800/60 font-bold text-gray-100 tracking-wider text-lg rounded outline outline-2 outline-slate-500 self-center place-self-center'>
                  <i className='fa-solid fa-folder-open'></i>
                  <span>My Orders</span>
                </button>
              </div>
            </div>
          </article>
        )}
      </RightContainer>
    </MainContainer>
  )
}

export default Profile
