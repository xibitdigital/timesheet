import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Address</TableCell>
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
