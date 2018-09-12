import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  iconButton: {
    height: 148,
    width: 148,
  },
  buttonText: {
    fontSize: '1.2rem',
  },
  icon: {
    width: 100,
    height: 100,
    backgroundSize: 'cover',
  },
});


class Main extends React.Component {

  render() {
    const { classes, status, currentStatusID, handleStatusChange } = this.props;
    return (
      <Grid item lg={2} md={4} sm={4} xs={6}>
        <IconButton
          className={classes.iconButton}
          style={{ backgroundColor: currentStatusID === status.id && '#E0E0E0' }}
          onClick={() => handleStatusChange(status.id)}>
          <div className={classes.icon} style={{ backgroundImage: `url(${status.icon})` }} />
        </IconButton>
        <Typography className={classes.buttonText} variant="subheading" component="h3">
          {status.desc}
        </Typography>
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  currentStatusID: PropTypes.number.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Main);