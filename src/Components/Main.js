import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
  },
  grid: {
    height: '100%',
  },
});

class Main extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} onMouseMove={this.onMouseMoveHandler}>
        <Grid
          container
          className={classes.grid}
          alignItems="center"
          justify="center"
          spacing={16}>
          <Grid item>
            <Card className={classes.card}>
              <CardContent>
              </CardContent>
              <CardActions>
                <Button>Send</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);