import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword, updateLogin, signIn } from '../redux/reducers/auth'

const LoginForm = () => {
 const dispatch = useDispatch()
 const { login, password } = useSelector((s) => s.auth)

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="text"
              placeholder="Username"
             value={login}
             onChange={(e) => dispatch(updateLogin(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => dispatch(updatePassword(e.target.value))}
            />
            <p className="text-red text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              type="button"
             onClick={() => dispatch(signIn())}
            >
              Sign In
            </button>
          </div>
      </div>
    </div>
  )
}

LoginForm.propTypes = {}

export default LoginForm
