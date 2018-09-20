import React from 'react';
import request from 'superagent';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Header from './Header';

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

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page">
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page">
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

function createData(id, status, comment) {
  return { id, status, comment };
}

class Main extends React.Component {
  state = {
    responseUrl: `${window.location.protocol}//${window.location.hostname}:31020`,
    loading: false,
    success: false,
    rows: [],
    page: 0,
    rowsPerPage: 10,
  };

  componentDidMount = () => {
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
              let rows = [];
              res.body.map((i) => rows.push(createData(i.id, i.status, i.comment)));
              this.setState({ rows });
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
  };

  handleChangePage = (event, page) => this.setState({ page });

  handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value });

  render() {
    const { classes } = this.props;
    const { responseUrl, rows, rowsPerPage, page } = this.state;

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
              {rows &&
                <div>
                  <Typography variant="headline" component="h2">
                    Responses
                  </Typography>
                  <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Comment</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, x) => {
                          return (
                            <TableRow key={x}>
                              <TableCell component="th" scope="row">
                                {row.id}
                              </TableCell>
                              <TableCell>
                                {row.status === -2 ? 'Very Dissatisfied'
                                  : row.status === -1 ? 'Dissatisfied'
                                    : row.status === 0 ? 'Neutral'
                                      : row.status === 1 ? 'Satisfied'
                                        : row.status === 2 && 'Very Satisfied'} ({row.status})
                              </TableCell>
                              <TableCell>{row.comment}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActionsWrapped}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
              }
            </CardContent>
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