import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
// import { CircularProgress, Typography } from '@material-ui/core';
import Main from './Main';

const styles = theme => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
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
    const { classes, theme } = this.props;
    const { config, snackMessage } = this.state;

    return (
      <div className={classes.root}>
        <Main />

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
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);
