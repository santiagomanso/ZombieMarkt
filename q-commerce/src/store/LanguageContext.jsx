import { createContext, useEffect, useState } from 'react'
import { dictionary } from '../utils/dictionary'

export const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  //states for language (es/en/de) and state for dictionary property
  const [language, setLanguage] = useState('en')
  const [txt, setTxt] = useState(dictionary.en)
  const [name, setName] = useState('United States')

  //state for flag
  const [flag, setFlag] = useState(
    'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png',
  )

  const changeLanguage = (flag, language, name) => {
    setFlag(flag)
    setLanguage(language)
    setName(name)
    setTxt(dictionary[language])
  }

  //detect user language based on the navigator.language
  const getBrowserLanguage = () => {
    switch (navigator.language) {
      case 'es':
        setLanguage('es')
        setTxt(dictionary.es)

        setFlag(
          'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-spain2x.png',
        )
        break

      case 'en':
        setLanguage('en')
        setTxt(dictionary.en)

        setFlag(
          'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png',
        )
        break

      case 'de':
        setLanguage('de')
        setTxt(dictionary.de)

        setFlag(
          'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-germany2x.png',
        )
        break

      default:
        setLanguage('en')
        setTxt(dictionary.en)
        setFlag(
          'https://cdn3.iconfinder.com/data/icons/142-mini-country-flags-16x16px/32/flag-usa2x.png',
        )
        break
    }
  }

  useEffect(() => {
    getBrowserLanguage()
  }, [])

  const data = {
    txt,
    language,
    flag,
    name,
    changeLanguage,
  }

  return (
    <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
  )
}
