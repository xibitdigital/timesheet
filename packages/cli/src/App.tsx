import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grommet,grommet } from "grommet";
import { deepMerge } from "grommet/utils";
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Navbar } from './pages/Navbar';


const customTheme = deepMerge(grommet, {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
});


const App: React.FC = () => {  
  return (
    <Grommet full theme={customTheme}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <div className="container">
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
        </div>
      </Switch>
    </BrowserRouter>
    </Grommet>
  )
}

export default App
