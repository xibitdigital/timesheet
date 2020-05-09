import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { ClientPage } from './pages/client/ClientPage'
import { Home } from './pages/Home'
import { TimesheetPage } from './pages/timesheet/TimesheetPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar title="Timesheet" />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/client" component={ClientPage} />
        <Route path="/timesheet" component={TimesheetPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
