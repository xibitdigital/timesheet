import React from 'react'
import { Client } from '../../../shared/collections'

interface ClientListProps {
  loading: boolean
  items: Client[] | undefined
}

export const ClientList: React.FC<ClientListProps> = ({
  loading,
  items,
}: ClientListProps) => {
  return (
    <ul>
      {!loading &&
        items &&
        items.map((doc) => (
          <li key={doc.id}>
            {doc.id} - {doc.name}
          </li>
        ))}
    </ul>
  )
}
