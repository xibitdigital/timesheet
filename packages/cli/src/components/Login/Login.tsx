import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { StoreState } from '../../reducer'
import { AuthState } from '../../features/auth/types'
import { handleAuthenticationCallback } from '../../features/auth/actions'
import { signIn, signOut } from '../../features/auth/api'

type PropsFromDispatch = {
  actions: {
    handleAuthenticationCallback: typeof handleAuthenticationCallback
  }
}

type LoginProps = AuthState

type AllProps = AuthState

export const Login: React.FC = () => {
  const authenticated = false

  return (
    <nav>
      <div className="nav-wrapper cyan darken-1 px1">
        <NavLink to="/" className="brand-logo">
          Redux + TypeScript
        </NavLink>
        <ul className="right hide-on-med-and-down">
          <li cy-data="home-nav-link">
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            {!authenticated && (
              <button type="button" onClick={() => signIn()}>
                Log in
              </button>
            )}

            {authenticated && (
              <button type="button" onClick={() => signOut()}>
                Log out
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    handleAuthenticationCallback: () =>
      dispatch(handleAuthenticationCallback()),
  },
})

const mapStateToProps = ({ auth }: StoreState) => ({
  loading: auth.loading,
  errors: auth.errors,
  data: auth.data,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
