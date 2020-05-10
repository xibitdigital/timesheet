import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { ClientPage } from './pages/client/ClientPage'
import { Home } from './pages/Home'
import { TimesheetPage } from './pages/timesheet/TimesheetPage'
import { ClientDetailPage } from './pages/client/ClientDetailPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar title="Timesheet" />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/client/:id" component={ClientDetailPage} />
          <Route path="/client" component={ClientPage} />
          <Route path="/timesheet" component={TimesheetPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
