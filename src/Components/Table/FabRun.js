import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    right: '5px',
    bottom: '5px',
  },
});

function FabRun(props) {
  const classes = props.classes;

  return (
    <Button
      variant="fab"
      color="primary"
      aria-label="Run"
      className={classes.fab}
      disabled={props.disabled}
      onClick={props.handleRun}>
      <ArrowForward />
    </Button>
  );
}

FabRun.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleRun: PropTypes.func.isRequired,
};

export default withStyles(styles)(FabRun);
