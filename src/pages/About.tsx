import { Button } from 'grommet'
import React, { Fragment } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Item } from '../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../shared/firebase.config'
import { BackButton } from '../components/BackButton'

export const About: React.FC = () => {
  const [value, loading, error] = useCollectionData<Item>(
    FIRESTORE.collection(COLLECTIONS.ITEMS),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const addItem = () => {
    const newItem: Partial<Item> = { name: 'x', surname: 'y' }
    FIRESTORE.collection(COLLECTIONS.ITEMS).add(newItem)
  }

  return (
    <Fragment>
      <h1>About {error ? 'Error' : ''}</h1>
      <div>{loading ? 'loading' : 'ok!'}</div>
      <ul>
        {!loading &&
          value &&
          value.map((doc) => (
            <li key={doc.id}>
              {doc.id} - {doc.name}
            </li>
          ))}
      </ul>
      <BackButton />
      <Button onClick={addItem} label="Add" />
    </Fragment>
  )
}
