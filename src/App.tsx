import { Container } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ClientPage } from './pages/Client/ClientPage'
import { Home } from './pages/Home'
import { TimesheetPage } from './pages/Timesheet/TimesheetPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar title="Timesheet" />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/client" component={ClientPage} />
          <Route path="/timesheet" component={TimesheetPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
