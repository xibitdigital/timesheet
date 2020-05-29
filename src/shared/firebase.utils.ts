import { isNil } from 'ramda'
import { COLLECTIONS, FirebaseCollectionItem } from './collections'
import { FIREBASE, FIRESTORE } from './firebase.config'

export function getCurrentUserUid(): string | null {
  const currentUser = FIREBASE.auth().currentUser
  return currentUser && currentUser.uid ? currentUser.uid : null
}

export function checkFirebaseHash(hash: string): boolean {
  return !isNil(hash) && hash.length === 20 // check hash length
}

export function upsertDoc<T>(
  documentId: string,
  collection: COLLECTIONS,
  data: T
): Promise<any> {
  if (!checkFirebaseHash(documentId)) {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<T & FirebaseCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(collection).add(newItem)
    }
    return Promise.reject()
  } else {
    return FIRESTORE.collection(collection).doc(documentId).update(data)
  }
}

export function fetchDoc<T>(
  documentId: string,
  collection: COLLECTIONS
): Promise<T> {
  if (!checkFirebaseHash(documentId)) {
    return Promise.reject()
  } else {
    return FIRESTORE.collection(collection)
      .doc(documentId)
      .get()
      .then((doc) => doc.data() as T)
  }
}
