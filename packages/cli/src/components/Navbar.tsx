import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '../shared/auth-spa'
import { Button } from 'grommet'

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
              <Button type="button" onClick={() => loginWithRedirect({})}>
                Log in
              </Button>
            )}

            {isAuthenticated && (
              <Button type="button" onClick={() => logout()}>
                Log out
              </Button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
