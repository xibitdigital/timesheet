import { Select } from 'grommet'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Client, Project } from '../../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../../shared/firebase.config'

interface ProjectSelectProps {
  onChange: (selected: Client) => void
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({onChange}) => {
  const [items, loading, error] = useCollectionData<Project>(
    FIRESTORE.collection(COLLECTIONS.PROJECT),
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
