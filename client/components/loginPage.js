import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Head from './head'
import CookiesBanner from './cookiesBanner'
import { updatePassword, updateLogin, signIn } from '../redux/reducers/auth'

const LoginPage = () => {
  const { email, password } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  return (
    <div>
      <Head title="Login" />
      <div className="flex flex-col h-screen bg-gray-100">
        {/* <!-- Auth Card Container --> */}
        <div className="grid mx-2 my-20 place-items-center sm:my-auto">
          {/* <!-- Auth Card --> */}
          <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
            {/* <!-- Card Title -->  */}
            <h2 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">Login</h2>

            {/*  <!-- Email Input --> */}
            <label htmlFor="email" className="block text-xs font-semibold text-gray-600 uppercase">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="e-mail address"
              value={email}
              onChange={(e) => dispatch(updateLogin(e.target.value))}
              autoComplete="email"
              className="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            {/* <!-- Password Input --> */}
            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => dispatch(updatePassword(e.target.value))}
              autoComplete="current-password"
              className="block w-full px-1 py-3 mt-2 mb-4 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            {/*  <!-- Auth Buttton --> */}
            <button
              type="submit"
              className="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
              onClick={() => dispatch(signIn())}
            >
              Login
            </button>

            {/* <!-- Another Auth Routes --> */}
            <div className="mt-8 text-sm text-center sm:flex sm:flex-wrap sm:mb-4">
              <a href="Forgot-password" className="underline flex-2">
                Forgot password?
              </a>

              <p className="flex-1 mx-4 my-1 text-gray-500 text-md sm:my-auto">or</p>

              <Link to="/registration" className="underline flex-2">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CookiesBanner />
    </div>
  )
}

export default LoginPage
