import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import Main from './Main';
import Admin from './Admin';

const styles = theme => ({
  root: {
    position: 'absolute',
    minHeight: '100%',
    minWidth: '100%',
    backgroundColor: theme.palette.mainBackground,
  },
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  progress: {
    marginBottom: theme.spacing.unit,
  },
});

class Root extends Component {
  state = {
    snackMessage: { open: false, text: '' },
  };

  render() {
    const { classes } = this.props;
    const { snackMessage } = this.state;

    return (
      <Router>
        <div className={classes.root}>
          <Route exact path="/" component={Main} />
          <Route exact path="/admin" component={Admin} />
          <Snackbar
            open={snackMessage.open}
            autoHideDuration={2000}
            onClose={this.handleClose}
            onExited={this.handleExited}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{snackMessage.text}</span>} />
        </div>
      </Router>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);
