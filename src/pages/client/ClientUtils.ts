import {
  Client,
  ClientCollectionItem,
  COLLECTIONS,
} from '../../shared/collections'
import { isEmpty } from 'ramda'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { FIRESTORE } from '../../shared/firebase.config'

export function upsertClientDoc(
  documentId: string,
  data: Client
): Promise<any> {
  if (isEmpty(documentId)) {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<ClientCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.CLIENT).add(newItem)
    }
    return Promise.reject()
  } else {
    return FIRESTORE.collection(COLLECTIONS.CLIENT).doc(documentId).update(data)
  }
}

export function fetchClientDoc(documentId: string): Promise<any> {
  if (isEmpty(documentId)) {
    return Promise.reject()
  } else {
    return new Promise((resolve, reject) => {
      FIRESTORE.collection(COLLECTIONS.CLIENT)
        .doc(documentId)
        .get()
        .then(
          (doc) => {
            resolve(doc.data())
          },
          () => reject({})
        )
    })
  }
}
