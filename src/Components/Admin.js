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
  card: {
    maxHeight: '100%',
    margin: theme.spacing.unit,
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  }
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
    apiUrl: `${window.location.protocol}//${window.location.hostname}${process.env.REACT_APP_API_PORT && `:${process.env.REACT_APP_API_PORT}`}`,
    loading: false,
    success: false,
    data: []
  };

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      const values = queryString.parse(this.props.location.search);
      this.setState({
        apiUrl: `${values.apiUrl ? values.apiUrl : `${window.location.protocol}//${window.location.hostname}${process.env.REACT_APP_API_PORT ? `:${process.env.REACT_APP_API_PORT}` : ''}`}`
      });
      const storedToken = sessionStorage.getItem('token');
      const token = storedToken ? storedToken : prompt('Enter token:');
      if (token)
        request
          .post(`${this.state.apiUrl}/api/response/get-all`)
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
    const { loading, apiUrl, data } = this.state;

    return (
      <Grid
        className={classes.grid}
        container
        alignItems="center"
        justify="center">
        <Grid item lg={6} md={10} sm={10} xs={12} className={classes.gridItem}>
          <Card className={classes.card}>
            <Header apiUrl={apiUrl} />
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