import React from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
} from '@material-ui/core'
import { Client } from '../../../shared/collections'

interface ClientListProps {
  loading: boolean
  items: Client[] | undefined
  onSelect: (id: string) => void
}

export const ClientList: React.FC<ClientListProps> = ({
  loading,
  items,
  onSelect,
}: ClientListProps): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Address</TableCell>
            <TableCell scope="col">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            items &&
            items.map((doc: Client) => (
              <TableRow key={doc.id}>
                <TableCell scope="row">
                  <strong>{doc.name}</strong>
                </TableCell>
                <TableCell>{doc.fullAddress}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(doc.id)}>S</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
