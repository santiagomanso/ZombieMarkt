import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactDom from 'react-dom'
import getTokenFromStorage from '../../utils/getTokenFromStorage'

const ModalCheckout = ({ active, setActive, children }) => {
  const menuRef = useRef()
  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActive(false)
      }
    }
    document.documentElement.addEventListener('keydown', detectKeyDown)
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setActive(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
    // console.log('dataType', dataType)
    //eslint-disable-next-line
  }, [])

  if (!active) return ''
  else {
    return ReactDom.createPortal(
      <>
        <div
          className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-br from-black/95 via-black/80 to-slate-900/60'
          onClick={() => setActive(!active)}
        />
        <div className='z-50 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-screen h-full lg:h-[80vh] lg:w-[50vw]  rounded-md'>
          <div ref={menuRef}>{children}</div>
        </div>
      </>,
      document.getElementById('portal'),
    )
  }
}

export default ModalCheckout
