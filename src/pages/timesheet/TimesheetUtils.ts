import {
  TimeSheet,
  TimeSheetCollectionItem,
  COLLECTIONS,
} from '../../shared/collections'
import { isEmpty } from 'ramda'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { FIRESTORE } from '../../shared/firebase.config'

export function upsertTimeSheetDoc(
  documentId: string,
  data: TimeSheet
): Promise<any> {
  if (isEmpty(documentId)) {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<TimeSheetCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.TIMESHEET).add(newItem)
    }
    return Promise.reject()
  } else {
    return FIRESTORE.collection(COLLECTIONS.TIMESHEET)
      .doc(documentId)
      .update(data)
  }
}

export function fetchTimeSheetDoc(documentId: string): Promise<any> {
  if (isEmpty(documentId)) {
    return Promise.reject()
  } else {
    return new Promise((resolve, reject) => {
      FIRESTORE.collection(COLLECTIONS.TIMESHEET)
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
