import React from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Header from './Header';
import Table from './Table/EnhancedTable';

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
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const createData = (id, status, comment) => {
  return {
    id, status:
      status === -2 ? 'Very Dissatisfied'
        : status === -1 ? 'Dissatisfied'
          : status === 0 ? 'Neutral'
            : status === 1 ? 'Satisfied'
              : status === 2 && 'Very Satisfied',
    comment
  };
}

class Admin extends React.Component {
  state = {
    responseUrl: `${window.location.protocol}//${window.location.hostname}:31020`,
    loading: false,
    success: false,
    data: []
  };

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      const values = queryString.parse(this.props.location.search);
      if (this.state.responseUrl !== values.responseUrl)
        this.setState({
          responseUrl: `${values.responseUrl ? values.responseUrl : `${window.location.protocol}//${window.location.hostname}:31020`}`
        });
      const storedToken = sessionStorage.getItem('token');
      const token = storedToken ? storedToken : prompt('Enter token:');
      if (token)
        request
          .post(`${this.state.responseUrl}/response/get-all`)
          .send({ token })
          .timeout({
            response: 10000,
            deadline: 60000,
          })
          .then(res => {
            if (res.status === 200) {
              this.setState({ loading: false, success: true }, () => {
                console.log('Responses received.');
                sessionStorage.setItem('token', token);
                let data = [];
                res.body.map((i) => data.push(createData(i.id, i.status, i.comment)));
                this.setState({ data });
              });
            } else {
              sessionStorage.removeItem('token');
              this.setState({ loading: false, success: false }, () => {
                console.error(`Error ${res.status}: ${res.body}`);
              });
            }
          })
          .catch(err => {
            sessionStorage.removeItem('token');
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

  handleChangePage = (_event, page) => this.setState({ page });

  handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value });

  render() {
    const { classes } = this.props;
    const { loading, responseUrl, data } = this.state;

    return (
      <Grid
        className={classes.grid}
        container
        alignItems="center"
        justify="center">
        <Grid item lg={6} md={10} sm={10} xs={12}>
          <Card className={classes.card}>
            <Header responseUrl={responseUrl} />
            <CardContent className={classes.cardContent} align="center">
              <Typography variant="headline" component="h2">
                Responses
              </Typography>
              <Table loading={loading} data={data} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(Admin);