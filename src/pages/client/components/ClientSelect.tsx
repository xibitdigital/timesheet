import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Client } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

interface ClientSelectProps {
  onChange: (selected: string) => void
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown; }>) => {    
    onChange(event.target.value as string);
  }

  return (
    <FormControl>
      <InputLabel>Client</InputLabel>
      <Select onChange={handleChange}>
        {selectOptions.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
