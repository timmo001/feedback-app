import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SearchState,
  SortingState
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GroupingPanel,
  PagingPanel,
  SearchPanel,
  TableColumnReordering,
  TableColumnVisibility,
  TableGroupRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable
} from '@devexpress/dx-react-grid-material-ui';

const styles = () => ({
  tableContainer: {
    height: '100%'
  },
  table: {
    height: '100%'
  }
});

class EnhancedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      pageSize: 10,
      pageSizes: [5, 10, 15, 20, 0],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'status', title: 'Status' },
        { name: 'comment', title: 'Comment' }
      ],
      tableColumnExtensions: [
        { columnName: 'comment', width: 400 },
      ],
      data: [],
      selection: [],
      loading: props.loading,
    };
  }

  changeColumnOrder = (newOrder) => this.setState({ columnOrder: newOrder });
  changeGrouping = grouping => this.setState({ grouping });
  changeCurrentPage = currentPage => this.setState({ currentPage });
  changePageSize = pageSize => this.setState({ pageSize });

  render() {
    const { classes, data } = this.props;
    const {
      columns, grouping, currentPage,
      pageSize, tableColumnExtensions, pageSizes,
      columnOrder
    } = this.state;

    return (
      <div className={classes.tableContainer}>
        {data ?
          <Grid className={classes.table} rows={data} columns={columns}>
            <DragDropProvider />
            <SortingState defaultSorting={[{ columnName: 'id', direction: 'asc' }]} />
            <GroupingState
              grouping={grouping}
              onGroupingChange={this.changeGrouping} />
            <SearchState />
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={this.changeCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={this.changePageSize} />
            <IntegratedGrouping />
            <IntegratedSorting />
            <IntegratedFiltering />
            <IntegratedPaging />
            <VirtualTable
              // height="auto"
              columnExtensions={tableColumnExtensions} />
            <TableGroupRow />
            <TableHeaderRow showSortingControls />
            <TableColumnReordering
              order={columnOrder}
              onOrderChange={this.changeColumnOrder} />

            <TableColumnVisibility />
            <Toolbar />
            <SearchPanel />
            <ColumnChooser />

            <GroupingPanel showGroupingControls showSortingControls />
            <PagingPanel pageSizes={pageSizes} />

          </Grid>
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