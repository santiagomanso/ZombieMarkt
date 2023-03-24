import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MainContainer from '../components/containers/MainContainer'
import RightContainer from '../components/containers/RightContainer'
import LeftPanel from '../components/leftPanel/LeftPanel'
import Modal from '../components/modal/Modal'

import { UserContext } from '../store/UserContext'
import getTokenFromStorage from '../utils/getTokenFromStorage'

const Profile = () => {
  //extract states from context
  const { user, setUser } = useContext(UserContext)

  //hooks
  const navigate = useNavigate()

  //internal states
  const [favorites, setFavorites] = useState('')
  const [orders, setOrders] = useState('')
  const [active, setActive] = useState('')

  useEffect(() => {
    //if logout on this page redirect to home
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
        console.log('data.user.favorites', data.user.favorites)
        setFavorites(data.user.favorites)
        setOrders(data.user.orders)
      } catch (error) {
        console.log('error', error)
      }
    }

    if (user) {
      if (!orders || !favorites) {
        getProfile()
      }
    }

    //FIXME cleanUp orders/Favorites properties to not drag across platform heavy json
    // return()=>{
    //   setUser({...user, user.orders:[], user.favorites:[]})
    // }
  }, [user])

  return (
    <MainContainer>
      <LeftPanel bottomCard />
      <RightContainer justifyCenter padding='py-20 lg:p-20'>
        {active === 'orders' ? (
          <Modal
            dataType='orders'
            active={active}
            setActive={setActive}
            array={orders}
            email={user.email}
          />
        ) : active === 'favorites' ? (
          <Modal
            dataType='favorites'
            active={active}
            setActive={setActive}
            array={favorites}
            setFavorites={setFavorites}
            email={user.email}
          />
        ) : (
          ''
        )}
        {user && (
          <article className='w-full shadow-2xl lg:rounded-lg flex flex-col lg:flex-row lg:outline lg:outline-1 lg:outline-gray-600 '>
            <div className='w-full lg:w-1/3 h-full bg-gradient-to-tl rounded p-10'>
              <img
                src={user.image}
                alt={user.email}
                className='w-full h-full object-scale-down rounded max-h-[500px]'
              />
            </div>
            <div className='w-full lg:w-2/3 bg-gray-700/10 grid grid-cols-2 lg:grid-cols-3 px-2 py-3 lg:p-10 place-content-center gap-x-10 gap-y-5 lg:gap-20'>
              <div className='flex flex-col'>
                <label className='font-medium text-gray-100' htmlFor='name'>
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
                <label className='font-medium text-gray-100' htmlFor='sku'>
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
              <div className='flex flex-col order-last lg:order-none'>
                <span className='font-medium text-gray-100' htmlFor='ean'>
                  Joined
                </span>
                <span className='px-1 py-[0.35rem] rounded outline outline-1 outline-gray-300 font-medium bg-white text-gray-800'>
                  {user.joined}
                </span>
              </div>
              <div className='flex flex-col'>
                <button
                  onClick={() => setActive('favorites')}
                  className='flex gap-1 justify-center items-baseline w-full bg-slate-800/60 font-bold text-gray-100 tracking-wider text-lg rounded outline outline-2 outline-slate-500 self-center place-self-center'
                >
                  <i className='fa-regular fa-heart'></i>
                  <span>Favourites</span>
                </button>
              </div>
              <div className='flex flex-col lg:col-span-1 w-full'>
                <button
                  onClick={() => setActive('orders')}
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
