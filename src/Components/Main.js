import React from 'react';
import request from 'superagent';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
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
import CircularProgress from '@material-ui/core/CircularProgress';
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
  gridStatus: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
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
    margin: theme.spacing.unit,
  },
  cardContent: {},
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
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class Main extends React.Component {
  state = {
    comment: '',
    loading: false,
    success: false,
  };

  handleStatusChange = status => this.setState({ status });

  handleChange = prop => event => this.setState({ [prop]: event.target.value });

  handleSend = () => {
    const values = queryString.parse(this.props.location.search);
    this.setState({ success: false, loading: true, }, () => {
      request
        .post(`${values.responseUrl ? values.responseUrl : `${window.location.protocol}//${window.location.hostname}:31020`}/response`)
        .send({
          id: this.props.id,
          status: this.state.status,
          comment: this.state.comment
        })
        .timeout({
          response: 10000,
          deadline: 60000,
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, success: true }, () => {
              console.log('Response sent.');
            });
          } else {
            this.setState({ loading: false, success: false }, () => {
              console.error(`Error ${res.status}: ${res.body}`);
            });
          }
        })
        .catch(err => {
          this.setState({ loading: false, success: false }, () => {
            if (err.response) {
              console.error(`Error: ${err.status} - ${err.response.text}`);
            } else {
              console.error(`Error: ${err.message} - Check your credentials and try again`);
            }
          });
        });
    });
  };

  render() {
    const { classes } = this.props;
    const { status, comment, loading, success } = this.state;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

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
                How satisfied are you with our service?
              </Typography>
              <Grid
                className={classes.gridStatus}
                container
                justify="space-around">
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    style={{ backgroundColor: status === -2 && '#E0E0E0' }}
                    onClick={() => this.handleStatusChange(-2)}>
                    <div className={classes.icon} style={{ backgroundImage: `url(${MinusTwoIcon})` }} />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Very Dissatisfied
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    style={{ backgroundColor: status === -1 && '#E0E0E0' }}
                    onClick={() => this.handleStatusChange(-1)}>
                    <div className={classes.icon} style={{ backgroundImage: `url(${MinusOneIcon})` }} />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Dissatisfied
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    style={{ backgroundColor: status === 0 && '#E0E0E0' }}
                    onClick={() => this.handleStatusChange(0)}>
                    <div className={classes.icon} style={{ backgroundImage: `url(${NeutralIcon})` }} />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Neutral
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    style={{ backgroundColor: status === 1 && '#E0E0E0' }}
                    onClick={() => this.handleStatusChange(1)}>
                    <div className={classes.icon} style={{ backgroundImage: `url(${PlusOneIcon})` }} />
                  </IconButton>
                  <Typography className={classes.buttonText} variant="subheading" component="h3">
                    Satisfied
                  </Typography>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    style={{ backgroundColor: status === 2 && '#E0E0E0' }}
                    onClick={() => this.handleStatusChange(2)}>
                    <div className={classes.icon} style={{ backgroundImage: `url(${PlusTwoIcon})` }} />
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
              {status === undefined &&
                <Typography color="error" variant="subheading" component="h3">
                  Please choose an option
                </Typography>
              }
              <div className={classes.wrapper}>
                <Button
                  className={buttonClassname}
                  disabled={status === undefined || loading}
                  onClick={this.handleSend}>
                  Send
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
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