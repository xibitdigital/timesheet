import { isEmpty } from 'ramda'
import { COLLECTIONS, WorkedDay } from '../../shared/collections'
import { FIRESTORE } from '../../shared/firebase.config'

export function updateWorkday(
  documentId: string,
  data: WorkedDay
): Promise<any> {
  if (!isEmpty(documentId)) {
    return FIRESTORE.collection(COLLECTIONS.WORKED_DAYS)
      .doc(documentId)
      .update(data)
  }
  return Promise.reject()
}
