import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../resources/logo.svg';

const styles = theme => ({
  media: {
    backgroundSize: 'contain',
    height: 140,
    [theme.breakpoints.up('md')]: {
      height: 240,
    },
  },
});

class Header extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <CardContent>
        <CardMedia
          className={classes.media}
          image={Logo}
          title="Feedback" />
      </CardContent>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);