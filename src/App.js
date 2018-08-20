import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import green from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import 'typeface-roboto';
import '@mdi/font/css/materialdesignicons.min.css';
import './App.css';
import Root from './Components/Root';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: grey,
    mainBackground: grey[100],
    backgrounds: {
      light: blueGrey[600],
      main: blueGrey[400],
      dark: blueGrey[200],
      disabled: grey[200],
    },
    defaultText: {
      light: grey[700],
      main: grey[800],
      dark: grey[900],
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Root />
      </MuiThemeProvider>
    );
  }
}

export default App;