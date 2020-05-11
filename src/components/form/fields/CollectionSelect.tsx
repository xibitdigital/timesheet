import { MenuItem, Select, SelectProps } from '@material-ui/core'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FirebaseCollectionItem } from '../../../shared/collections'

interface CollectionSelectProps extends SelectProps {
  firestore: firebase.firestore.Firestore
  collection: string
  label: string
}

export const CollectionSelect: React.FC<CollectionSelectProps> = (
  props
): JSX.Element => {
  const { id, firestore, onChange, collection, label = '', value = '' } = props
  const [items, loading, error] = useCollectionData<FirebaseCollectionItem>(
    firestore.collection(collection),
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
