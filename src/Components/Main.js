import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../resources/logo.svg';
import PlusOneIcon from '../resources/plusOne.svg';
import PlusTwoIcon from '../resources/plusTwo.svg';
import NeutralIcon from '../resources/zero.svg';
import MinusOneIcon from '../resources/minusOne.svg';
import MinusTwoIcon from '../resources/minusTwo.svg';

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
  media: {
    backgroundSize: 'contain',
    height: 140,
    [theme.breakpoints.up('md')]: {
      height: 240,
    },
  },
  fill: {
    flexGrow: 1,
  },
  margin: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    flexBasis: '50%',
  },
  fakeButton: {
    width: 256,
  },
  card: {
    overflowY: 'auto',
  },
  cardContent: {
    // paddingTop: theme.spacing.unit / 2,
    // paddingBottom: 0,
  },
  iconButton: {
    height: 172,
    width: 172,
    display: 'flex',
  },
  buttonText: {
    fontSize: '1.6rem',
  }
});

class Main extends React.Component {
  state = {
    status: 0,
    comment: '',
  };

  handleStatusChange = status => this.setState({ status });

  handleChange = prop => event => this.setState({ [prop]: event.target.value });

  render() {
    const { classes } = this.props;
    const { status, comment } = this.state;

    return (
      <Grid
        className={classes.grid}
        container
        alignItems="center"
        justify="center">
        <Grid item lg={6} md={10} sm={10} xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <CardMedia
                className={classes.media}
                image={Logo}
                title="Feedback" />
            </CardContent>
            <CardContent className={classes.cardContent} align="center">
              <Typography variant="headline" component="h2">
                How are you satisfied with our services?
              </Typography>
              <Grid
                className={classes.grid}
                container
                justify="space-around">
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton className={classes.iconButton} onClick={() => this.handleStatusChange(-1)}>
                    <img src={MinusTwoIcon} width={100} alt="Very Dissatisfied" />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Very Dissatisfied
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton className={classes.iconButton} onClick={() => this.handleStatusChange(-1)}>
                    <img src={MinusOneIcon} width={100} alt="Dissatisfied" />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Dissatisfied
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton className={classes.iconButton} onClick={() => this.handleStatusChange(-1)}>
                    <img src={NeutralIcon} width={100} alt="Neutral" />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Neutral
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton className={classes.iconButton} onClick={() => this.handleStatusChange(-1)}>
                    <img src={PlusOneIcon} width={100} alt="Satisfied" />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Satisfied
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton className={classes.iconButton} onClick={() => this.handleStatusChange(-1)}>
                    <img src={PlusTwoIcon} width={100} alt="Very Satisfied" />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Very Satisfied
                  </Typography>
                </Grid>
              </Grid>
              <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
                <InputLabel htmlFor="comment">Any other comments?</InputLabel>
                <Input
                  id="comment"
                  type="text"
                  multiline
                  value={comment}
                  onChange={this.handleChange('comment')}
                  onKeyPress={this.handleKeyPress} />
              </FormControl>
            </CardContent>
            <CardActions>
              <div className={classes.fill} />
              <Button onClick={this.handleSend}>Send</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);