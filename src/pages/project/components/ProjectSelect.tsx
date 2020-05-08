import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Project } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

interface ProjectSelectProps {
  onChange: (selected: string) => void
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
  onChange,
}: ProjectSelectProps): JSX.Element => {
  const [items, loading, error] = useCollectionData<Project>(
    FIRESTORE.collection(COLLECTIONS.PROJECT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const selectOptions = loading || !items || error ? [] : Array.from(items)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // TODO fix type here
    onChange(event.target.value as string)
  }

  return (
    <FormControl>
      <InputLabel htmlFor="selectProject">Project</InputLabel>
      <Select
        id="selectProject"
        aria-describedby="Select project"
        value={null}
        onChange={handleChange}
      >
        {selectOptions.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
