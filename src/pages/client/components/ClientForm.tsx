import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import { Client } from '../../../shared/collections'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const defaultFormValues: Client = {
  name: '',
  fullAddress: '',
  postcode: '',
}

interface ClientFormProps {
  addClient: (newClient: Partial<Client>) => void
}

export const ClientForm: React.FC<ClientFormProps> = ({
  addClient,
}: ClientFormProps) => {
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState(defaultFormValues)

  function handleFormChange(evt: React.FormEvent<HTMLFormElement>) {
    const {name, value} = evt.target as any;
    setFormValues({...formValues, [name]: value});
  }

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    console.log('Submit')
    addClient(formValues)
    evt.preventDefault()
  }

  function handleFormReset(nextValue: React.FormEvent<HTMLFormElement>) {
    console.log('Reset', nextValue)
    setFormValues(defaultFormValues)
  }
  return (
    <form
      noValidate
      autoComplete="off"
      onChange={handleFormChange}
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <FormControl className={classes.formControl}>
        <InputLabel>Name</InputLabel>
        <Input name="name" defaultValue={formValues.name} />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Full Address</InputLabel>
        <Input name="fullAddress" defaultValue={formValues.fullAddress} />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Postcode</InputLabel>
        <Input name="postcode" defaultValue={formValues.postcode} />
      </FormControl>
      <Box>
        <Button type="submit" color="primary">
          Submit
        </Button>
        <Button type="reset">Reset</Button>
      </Box>
    </form>
  )
}
