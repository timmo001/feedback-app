import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  SortingState, FilteringState, // SelectionState,
  IntegratedFiltering, IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableFilterRow, // TableSelection,
  DragDropProvider,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
// import FabRun from './FabRun';

const styles = () => ({});

const portColumns = [
  { name: 'id', title: 'ID' },
  { name: 'status', title: 'Status' },
  { name: 'comment', title: 'Comment' },
];

class EnhancedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolios: [],
      data: [],
      selection: [],
      loading: props.loading,
    };
  }

  // changeSelection = selection => this.setState({ selection });

  render() {
    return (
      <div className="display-flex">
        {this.props.data ?
          <div>
            <Grid
              rows={this.props.data}
              columns={portColumns}>
              <Table allowColumnReordering />
              <TableColumnReordering defaultOrder={portColumns.map(column => column.name)} />
              <FilteringState />
              <SortingState defaultSorting={[{ columnName: 'id', direction: 'asc' }]} />
              <IntegratedFiltering />
              <IntegratedSorting />
              {/* <SelectionState selection={this.state.selection} onSelectionChange={this.changeSelection} /> */}
              <DragDropProvider />
              <TableHeaderRow allowSorting allowDragging />
              <TableFilterRow />
              {/* <TableSelection selectByRowClick highlightSelected /> */}
            </Grid>
            {/* <FabRun loading={this.state.loading} disabled={this.state.selection.length === 0} handleRun={() => {
                var portfolios = [];
                this.state.selection.map(i => {
                  return portfolios.push(this.state.portfolios[i]);
                });
                this.props.handleRunPorts(portfolios);
              }} /> */}
          </div>
          :
          <CircularProgress className="progress" size={50} />
        }
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.array
};

export default withStyles(styles)(EnhancedTable);