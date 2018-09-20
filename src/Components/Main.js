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
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './Header';
import StatusButton from './Button';
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
  textField: {
    flexBasis: '50%',
  },
  card: {
    margin: theme.spacing.unit,
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
    responseUrl: `${window.location.protocol}//${window.location.hostname}:31020`,
    loading: false,
    success: false,
  };

  componentWillReceiveProps = (nextProps) => {
    const values = queryString.parse(this.props.location.search);
    if (this.state.responseUrl !== values.responseUrl) this.setState({
      responseUrl: `${values.responseUrl ? values.responseUrl : `${window.location.protocol}//${window.location.hostname}:31020`}`
    });
    if (this.state.id !== values.id) this.setState({ id: values.id });
  };

  handleStatusChange = status => this.setState({ status });

  handleChange = prop => event => this.setState({ [prop]: event.target.value });

  handleSend = () => {
    this.setState({ success: false, loading: true, }, () => {
      request
        .post(`${this.state.responseUrl}/response`)
        .send({
          id: this.state.id ? this.state.id : -1,
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
    const { status, comment, loading, success, responseUrl } = this.state;
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
            <Header responseUrl={responseUrl} />
            {!success ?
              <div>
                <CardContent className={classes.cardContent} align="center">
                  <Typography variant="headline" component="h2">
                    How satisfied are you with our service?
                  </Typography>
                  <Grid
                    className={classes.gridStatus}
                    container
                    justify="space-around">
                    <StatusButton status={{ id: -2, desc: 'Very Dissatisfied', icon: MinusTwoIcon }} currentStatusID={status} handleStatusChange={this.handleStatusChange} />
                    <StatusButton status={{ id: -1, desc: 'Dissatisfied', icon: MinusOneIcon }} currentStatusID={status} handleStatusChange={this.handleStatusChange} />
                    <StatusButton status={{ id: 0, desc: 'Neutral', icon: NeutralIcon }} currentStatusID={status} handleStatusChange={this.handleStatusChange} />
                    <StatusButton status={{ id: 1, desc: 'Satisfied', icon: PlusOneIcon }} currentStatusID={status} handleStatusChange={this.handleStatusChange} />
                    <StatusButton status={{ id: 2, desc: 'Very Satisfied', icon: PlusTwoIcon }} currentStatusID={status} handleStatusChange={this.handleStatusChange} />
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
              </div>
              :
              <CardContent className={classes.cardContent} align="center">
                <Typography variant="headline" component="h2">
                  Thank you for your feedback!
                </Typography>
                <Typography variant="subheading" component="h4">
                  You can now close this tab/window.
                </Typography>
              </CardContent>
            }
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