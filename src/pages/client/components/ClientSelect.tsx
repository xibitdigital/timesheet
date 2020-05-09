import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { FormGroup, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Client } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

interface ClientSelectProps {
  onChange: (selected: string) => void
}

export const ClientSelect: React.FC<ClientSelectProps> = ({
  onChange,
}: ClientSelectProps): JSX.Element => {
  const [items, loading, error] = useCollectionData<Client>(
    FIRESTORE.collection(COLLECTIONS.CLIENT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const selectOptions = loading || !items || error ? [] : Array.from(items)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    onChange(event.target.value as string)
  }

  return (
    <FormGroup>
      <InputLabel htmlFor="clientSelect">Client</InputLabel>
      <Select
        id="clientSelect"
        aria-describedby="Select client"
        onChange={handleChange}
      >
        {selectOptions.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormGroup>
  )
}
