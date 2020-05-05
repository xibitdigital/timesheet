import React from 'react'
import { Client } from '../../../shared/collections'
import { Table, TableHeader, TableRow, TableBody, TableCell } from 'grommet'

interface ClientListProps {
  loading: boolean
  items: Client[] | undefined
}

export const ClientList: React.FC<ClientListProps> = ({
  loading,
  items,
}: ClientListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Name
          </TableCell>
          <TableCell scope="col" border="bottom">
            Address
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!loading &&
          items &&
          items.map((doc: Client) => (
            <TableRow key={doc.id}>
              <TableCell scope="row">
                <strong>{doc.name}</strong>
              </TableCell>
              <TableCell>{doc.fullAddress}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
