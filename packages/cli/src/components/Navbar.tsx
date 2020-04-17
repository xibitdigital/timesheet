import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '../shared/auth-spa'

export const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

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
            {!isAuthenticated && (
              <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && (
              <button onClick={() => logout()}>Log out</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
