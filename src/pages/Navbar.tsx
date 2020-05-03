import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DEFAULT_PROVIDER, FIREBASE } from '../shared/firebase.config';
import { Button } from 'grommet';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [user, initialising, error] = useAuthState(FIREBASE.auth());
  const login = () => {
    FIREBASE.auth().signInWithPopup(DEFAULT_PROVIDER);
  };
  const logout = () => {
    FIREBASE.auth().signOut();
  };

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Button onClick={logout} label="Log out"/>
      </div>
    );
  }
  return <Button onClick={login} label="Log In"/>;
};