import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import App from './App'

const theme = createMuiTheme()

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
)
