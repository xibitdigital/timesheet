import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import { ClientCollectionItem } from '../../../shared/collections'

interface ClientListProps {
  loading: boolean
  items: ClientCollectionItem[] | undefined
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
            items.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell scope="row">
                  <strong>{doc.name}</strong>
                </TableCell>
                <TableCell>{doc.fullAddress}</TableCell>
                <TableCell>
                  <Button onClick={() => onSelect(doc.id)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
