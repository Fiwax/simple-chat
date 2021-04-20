import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'

const CookiesBanner = () => {
  const cookies = new Cookies()
  useEffect(() => {
    const cookiesBtn = document.querySelector('.cookie-btn')
    const cookieBanner = document.querySelector('.cookie-container')
    cookiesBtn.addEventListener('click', () => {
      cookies.set('cookieBannerHidden', 'true', { path: '/', maxAge: 1000 * 48 * 10 })
      cookieBanner.classList.toggle('hidden')
    })
  }, [])

  useEffect(() => {
    const cookieBanner = document.querySelector('.cookie-container')
    if (!cookies.get('cookieBannerHidden'))
      setTimeout(() => {
        cookieBanner.classList.remove('hidden')
      }, 500)
  }, [])

  return (
    <div className="cookie-container transition duration-700 ease-linear hidden fixed bottom-0 p-4 bg-gray-800 flex justify-between items-center text-white w-full">
      This site uses cookies to provide you with a great user exprerience.
      <button
        className="cookie-btn bg-red-700 hover:bg-red-500 px-5 pt-1 pb-1 rounded text-white"
        type="button"
      >
        Okay
      </button>
    </div>
  )
}

export default CookiesBanner
