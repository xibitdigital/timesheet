import { Button, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet'
import { Edit } from 'grommet-icons'
import React from 'react'
import { TimeSheet } from '../../../shared/collections'

interface TimesheetProps {
  loading: boolean
  items: TimeSheet[] | undefined
}

const handleEdit = (id: string | undefined) => () => {
  console.log(id)
}

export const TimeSheetList: React.FC<TimesheetProps> = ({
  loading,
  items,
}: TimesheetProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Month
          </TableCell>
          <TableCell scope="col" border="bottom">
            Year
          </TableCell>
          <TableCell scope="col" border="bottom">
            Actions
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!loading &&
          items &&
          items.map((doc: TimeSheet) => (
            <TableRow key={doc.id}>
              <TableCell scope="row">
                <strong>{doc.month}</strong>
              </TableCell>
              <TableCell>{doc.year}</TableCell>
              <TableCell><Button icon={<Edit />} onClick={handleEdit(doc.id)} primary /></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
