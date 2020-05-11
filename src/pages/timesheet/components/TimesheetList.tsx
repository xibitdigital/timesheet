import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import { TimeSheetCollectionItem } from '../../../shared/collections'

interface TimesheetProps {
  loading: boolean
  items: TimeSheetCollectionItem[] | undefined
}

const handleEdit = (id: string | undefined) => () => {
  console.log(id)
}

export const TimeSheetList: React.FC<TimesheetProps> = ({
  loading,
  items,
}: TimesheetProps): JSX.Element => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Month</TableCell>
            <TableCell scope="col">Year</TableCell>
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
                <TableCell>{doc.month}</TableCell>
                <TableCell>{doc.year}</TableCell>
                <TableCell>
                  <IconButton onClick={handleEdit(doc.id)}>
                    <EditIcon />
                  </IconButton>{' '}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
