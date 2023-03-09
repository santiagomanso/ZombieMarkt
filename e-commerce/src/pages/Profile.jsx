import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import LeftPanel from '../components/leftPanel/LeftPanel'
import ModalOrders from '../components/modal/ModalOrders'

import { UserContext } from '../store/UserContext'
import getTokenFromStorage from '../utils/getTokenFromStorage'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [orders, setOrders] = useState('')

  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!user) navigate('/')
    const getProfile = async () => {
      const myHeaders = {
        authorization: `Bearer ${getTokenFromStorage()}`,
      }
      try {
        const { data } = await axios.get(
          'http://localhost:5500/api/users/profile',
          {
            headers: myHeaders,
          },
        )
        setUser(data.user)
        // console.log('user', user)
      } catch (error) {
        console.log('error', error)
      }
    }

    if (!orders) {
      getProfile()
    }
  }, [])

  return (
    <MainContainer>
      <LeftPanel bottomCard />
      <RightContainer justifyCenter lgPadding='lg:p-20'>
        {active ? (
          <ModalOrders
            active={active}
            setActive={setActive}
            orders={user.orders}
            email={user.email}
          />
        ) : (
          ''
        )}
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
                  readOnly={true}
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
                  readOnly={true}
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
                  readOnly={true}
                  className='outline outline-1 outline-gray-300 text-gray-200 font-medium'
                  type='text'
                  name='ean'
                  value={user.joined}
                  disabled
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
                <button
                  onClick={() => setActive(true)}
                  className='flex gap-1 justify-center items-baseline w-full bg-slate-800/60 font-bold text-gray-100 tracking-wider text-lg rounded outline outline-2 outline-slate-500 self-center place-self-center'
                >
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
