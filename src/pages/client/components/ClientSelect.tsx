import { Select } from 'grommet'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Client } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

interface ClientSelectProps {
  onChange: (selected: Client) => void
}

export const ClientSelect: React.FC<ClientSelectProps> = ({onChange}) => {
  const [items, loading, error] = useCollectionData<Client>(
    FIRESTORE.collection(COLLECTIONS.CLIENT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const selectOptions = loading || !items || error ? [] : Array.from(items)

  const handleChange = (event: any) => { // TODO fix type here
    onChange(event.option);
  }

  return (
    <Select
      options={selectOptions}
      labelKey="name"
      valueKey="id"
      onChange={handleChange}
    />
  )
}
