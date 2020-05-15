import { Container } from '@material-ui/core'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ClientPage } from './pages/client'
import { Home } from './pages/home'
import { TimesheetPage } from './pages/timesheet'

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
