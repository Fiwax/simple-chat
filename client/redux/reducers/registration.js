import { history } from '..'

const UPDATE_EMAIL_FIELD = 'UPDATE_EMAIL_FIELD'
const UPDATE_PASSWORD_FIELD = 'UPDATE_PASSWORD_FIELD'
const UPDATE_NAME_FIELD = 'UPDATE_NAME_FIELD'
const REGISTER = 'REGISTER'

const intitalState = {
  email: '',
  full_name: '',
  password: '',
  status: ''
}

export default (state = intitalState, action) => {
  switch (action.type) {
    case UPDATE_EMAIL_FIELD: {
      return { ...state, email: action.email }
    }
    case UPDATE_NAME_FIELD: {
      return { ...state, full_name: action.name }
    }
    case UPDATE_PASSWORD_FIELD: {
      return { ...state, password: action.password }
    }
    case REGISTER: {
      return { ...state, status: action.status, password: '', email: '', full_name: '' }
    }
    default:
      return state
  }
}

export function emailField(email) {
  return { type: UPDATE_EMAIL_FIELD, email }
}

export function nameField(name) {
  return { type: UPDATE_NAME_FIELD, name }
}

export function passwordField(password) {
  return { type: UPDATE_PASSWORD_FIELD, password }
}

export function tryRegisterUser() {
  return (dispatch, getState) => {
    const store = getState()
    const { email, password, full_name } = store.registration
    fetch('/api/v1/registration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        full_name,
        password
      })
    })
      .then((r) => r.json())
      .then((data) => {
        dispatch({ type: REGISTER, status: data.status })
        history.push('/login')
      })
  }
}
