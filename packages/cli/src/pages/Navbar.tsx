import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DEFAULT_PROVIDER, FIREBASE } from '../shared/firebase.config';

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
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
};