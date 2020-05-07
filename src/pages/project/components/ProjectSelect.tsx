import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Project } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

interface ProjectSelectProps {
  onChange: (selected: string) => void
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({ onChange }) => {
  const [items, loading, error] = useCollectionData<Project>(
    FIRESTORE.collection(COLLECTIONS.PROJECT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const selectOptions = loading || !items || error ? [] : Array.from(items)

  const handleChange = (event: React.ChangeEvent<{ value: unknown; }>) => {    
    // TODO fix type here
    onChange(event.target.value as string)
  }

  return (
    <FormControl>
      <InputLabel>Project</InputLabel>
      <Select value={null} onChange={handleChange}>
        {selectOptions.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
