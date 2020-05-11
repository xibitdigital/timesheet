import { FIREBASE } from './firebase.config'

export function getCurrentUserUid(): string | null {
  const currentUser = FIREBASE.auth().currentUser
  return currentUser && currentUser.uid ? currentUser.uid : null
}
