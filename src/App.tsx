import { Container } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ClientPage } from './pages/client'
import { Home } from './pages/home'
import { TimesheetPage } from './pages/timesheet'
import { ClientEdit } from './pages/client/ClientEdit'
import { TimesheetEdit } from './pages/timesheet/TimesheetEdit'
// import {} from 'styled-components/cssprop'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar title="Timesheet" />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/client/:documentId" component={ClientEdit} />
          <Route path="/client" component={ClientPage} exact />
          <Route
            path="/timesheet/:documentId"
            component={TimesheetEdit}
            exact
          />
          <Route path="/timesheet" component={TimesheetPage} exact />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
