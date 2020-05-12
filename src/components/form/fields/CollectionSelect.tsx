import { MenuItem, Select, SelectProps } from '@material-ui/core'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  FirebaseCollectionItem,
  COLLECTIONS,
} from '../../../shared/collections'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FIREBASE, FIRESTORE } from '../../../shared/firebase.config'

interface CollectionSelectProps extends SelectProps {
  collection: COLLECTIONS
  label: string
}

export const CollectionSelect: React.FC<CollectionSelectProps> = (
  props
): JSX.Element => {
  const [user] = useAuthState(FIREBASE.auth())
  const { id, onChange, collection, label = '', value = '' } = props
  const [items, loading, error] = useCollectionData<FirebaseCollectionItem>(
    FIRESTORE.collection(collection).where(
      'owner',
      '==',
      user ? user?.uid : ''
    ),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const selectOptions = loading || !items || error ? [] : items

  return (
    <Select
      id={id}
      name={id}
      aria-describedby={label}
      value={value}
      onChange={onChange}
    >
      {selectOptions.map((option) => (
        <MenuItem value={option.id} key={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  )
}
