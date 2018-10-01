import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../resources/logo.svg';
import imageExists from '../Common/imageExists';

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

    var logo = Logo;
    logo = `${this.props.responseUrl}/logo.svg`
    const logoUrl = `${this.props.responseUrl}/logo.svg`
    imageExists(logoUrl, (exists) => {
      if (exists) logo = logoUrl;
    });

    return (
      <CardContent>
        <CardMedia
          className={classes.media}
          image={logo}
          title="Feedback" />
      </CardContent>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);