import { useEffect, useState, useContext, useRef } from 'react'

import { countries } from '../../utils/countries'
import { LanguageContext } from '../../store/LanguageContext'

//TODO -
const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false) //<ul>activation
  const [activeCountry, setActiveCountry] = useState('')
  const menuRef = useRef(null)

  const { text, language, name, flag, changeLanguage } =
    useContext(LanguageContext)

  const handleClick = (country) => {
    changeLanguage(country.flag, country.language, country.name[language])
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  return (
    <div
      ref={menuRef}
      className='relative rounded-md cursor-pointer z-50'
      onClick={() => setOpen(!open)}
    >
      <div className='flex items-end justify-start gap-2 duration-200  rounded-lg px-2'>
        <img src={flag} alt='english' />
        <span>{language}</span>
      </div>
      <ul
        className={`fixed duration-100 ${
          open ? ' scale-100' : 'scale-0'
        } bg-gradient-to-br to-slate-600 from-gray-300 dark:from-slate-800 dark:to-neutral-800 capitalize w-40 flex flex-col  gap-4 rounded-md overflow-hidden z-[999]`}
      >
        {countries.map((country) => {
          return (
            <li
              key={country.id}
              onClick={() => handleClick(country)}
              className='flex items-center justify-start gap-2 hover:bg-gray-300 dark:hover:bg-zinc-900 hover:translate-x-1 duration-200 p-3 z-50 rounded w-[90%]'
            >
              <img src={country.flag} alt={country.name[language]} />
              <span className='text-'>{country.name[language]}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default LanguageSwitcher
