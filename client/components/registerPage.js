import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Head from './head'
import CookiesBanner from './cookiesBanner'
import { emailField, nameField, passwordField, tryRegisterUser } from '../redux/reducers/registration'

const RegisterPage = () => {
  const email = useSelector((s) => s.registration.email)
  const full_name = useSelector((s) => s.registration.full_name)
  const password = useSelector((s) => s.registration.password)

  const dispatch = useDispatch()
  return (
    <div>
      <Head title="Register" />
      <div className="flex flex-col h-screen bg-gray-100">
        {/* <!-- Auth Card Container --> */}
        <div className="grid mx-2 my-20 place-items-center sm:my-auto">
          {/* <!-- Auth Card --> */}
          <div className="w-11/12 p-12 px-6 py-10 bg-white rounded-lg shadow-md sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 sm:px-10 sm:py-6 lg:shadow-lg">
            {/* <!-- Card Title -->  */}
            <h2 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">
              Registration
            </h2>

            <form className="mt-10">
              {/*  <!-- Email Input --> */}
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="e-mail address"
                autoComplete="email"
                value={email}
                onChange={(e) => dispatch(emailField(e.target.value))}
                className="block w-full px-1 py-3 mt-2 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />

              {/* Name */}

              <label
                htmlFor="name"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Name
              </label>
              <input
                id="name"
                type="name"
                name="name"
                placeholder="name"
                autoComplete="name"
                value={full_name}
                onChange={(e) => dispatch(nameField(e.target.value))}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => dispatch(passwordField(e.target.value))}
                className="block w-full px-1 py-3 mt-2 mb-4 text-gray-800 border-b-2 border-gray-100 appearance-none focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required
              />

              {/*  <!-- Auth Buttton --> */}
              <button
                type="button"
                onClick={() => dispatch(tryRegisterUser())}
                className="w-full py-3 mt-10 font-medium text-white uppercase bg-gray-800 rounded-sm focus:outline-none hover:bg-gray-700 hover:shadow-none"
              >
                Register
              </button>

              {/* <!-- Another Auth Routes --> */}
              <div className="mt-8 text-sm text-center sm:flex sm:flex-wrap sm:mb-4">
                <a href="Forgot-password" className="underline flex-2">
                  Forgot password?
                </a>

                <p className="flex-1 mx-4 my-1 text-gray-500 text-md sm:my-auto">or</p>

                <Link to="/login" className="underline flex-2">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <CookiesBanner />
    </div>
  )
}

export default RegisterPage
