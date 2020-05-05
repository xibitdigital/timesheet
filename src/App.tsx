import { Grommet, grommet, Main } from 'grommet'
import { deepMerge } from 'grommet/utils'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { ClientPage } from './pages/client/ClientPage'

const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
})

const App: React.FC = () => {
  return (
    <Grommet full theme={customTheme}>
      <BrowserRouter>
        <Navbar />
        <Main pad="large">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/client" component={ClientPage} />
          </Switch>
        </Main>
      </BrowserRouter>
    </Grommet>
  )
}

export default App
