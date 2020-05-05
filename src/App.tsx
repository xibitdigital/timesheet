import { Grommet, grommet, Main } from 'grommet'
import { deepMerge } from 'grommet/utils'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { ClientPage } from './pages/client/ClientPage'
import { Home } from './pages/Home'

const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '12px',
      // height: '20px',
    },
  },
})

const App: React.FC = () => {
  return (
    <Grommet full theme={customTheme}>
      <BrowserRouter>
        <Navbar />
        <Main pad="small">
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
