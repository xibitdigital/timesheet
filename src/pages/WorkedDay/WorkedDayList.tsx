import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import React from 'react'
import { WorkedDayCollectionItem } from '../../shared/collections'

interface WorkedDayListProps {
  loading: boolean
  items: WorkedDayCollectionItem[] | undefined
  onSelect: (id: string) => void
}

export const WorkedDayList: React.FC<WorkedDayListProps> = ({
  loading,
  items,
  onSelect,
}: WorkedDayListProps): JSX.Element => {
  return (
    <TableContainer>
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
                  <strong>{doc.day}</strong>
                </TableCell>
                <TableCell>{doc.time}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onSelect(doc.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
