/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events ,jsx-a11y/no-static-element-interactions ,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Table, Button, Tooltip, Popover, Checkbox, Radio, Divider, Alert } from 'antd';
import {
  ColumnHeightOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  NumberOutlined,
  PlusOutlined,
  BorderOuterOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
import _ from 'lodash';
import queryString from 'query-string';
import Fullscreen from 'react-full-screen';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { TablePaginationConfig, ColumnsType } from 'antd/lib/table';
import DraggableBodyRow from './DraggableRow';

import './ListTableView.scss';

const defaultPageSize = 10;
const defaultPage = 1;
const PopoverConfig = { getPopupContainer: t => t };

const Component = forwardRef((props: Props, ref) => {
  const { history, location } = props;
  const { getData } = props;

  const selectedPreviewRef = useRef<SelectedPreview>(null);
  const query = queryString.parse(location.search);
  const columnsTitle = _.map(props.columns, 'title');

  // const [columns, setColumns] = useState(props.columns);
  const [fetching, setFetching] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    pageSize: _.toNumber(_.get(query, 'size')) || defaultPageSize,
    current: _.toNumber(_.get(query, 'page')) || defaultPage,
    total: 0
  });

  const [fullscreen, setFullscreen] = useState(false);
  const [size, setSize] = useState<TableSize>('middle');
  const [bordered, setBordered] = useState(props.bordered);
  const [selectedColumns, setSelectedColumns] = useState(columnsTitle);

  useImperativeHandle(ref, () => ({
    getData: getDataSource
  }));

  useEffect(() => {
    const { current, pageSize } = pagination;
    const queryParams = queryString.stringify({ page: current, size: pageSize });
    history.push(`${location.pathname}?${queryParams}`);

    getDataSource();
  }, []);

  const getDataSource = async ({ extra, pg }: { extra?: object; pg?: Pagination } = {}) => {
    if (fetching) return;
    setFetching(true);
    try {
      const { pageSize, current } = pg || pagination;
      const params = { ...extra, limit: pageSize, offset: (current - 1) * pageSize };

      const { rows, count } = await getData(params);

      setPagination({ pageSize, current, total: count });
      setDataSource(rows);
      // eslint-disable-next-line no-empty
    } catch (e) {}
    setFetching(false);
  };

  const handleTableChange = (pg: TablePaginationConfig) => {
    const newPg = { ...pagination, ...pg };
    const { current, pageSize } = newPg;
    const queryParams = queryString.stringify({ page: current, size: pageSize });
    history.push(`${location.pathname}?${queryParams}`);
    setPagination(newPg);
    if (!_.isEqual(newPg, pagination)) getDataSource({ pg: newPg });
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = dataSource[dragIndex];
    const dragOveredData = update(dataSource, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow]
      ]
    });
    setDataSource(dragOveredData);
    if (props.onDragOver) props.onDragOver(dragOveredData);
  };

  const TableSizeMenu = (
    <Radio.Group className="flex flex-col" onChange={e => setSize(e.target.value)} value={size}>
      <Radio className="mb-1" value="small">
        Small
      </Radio>
      <Radio className="mb-1" value="middle">
        Default
      </Radio>
      <Radio className="mb-1" value="large">
        Large
      </Radio>
    </Radio.Group>
  );

  const TableTools = (
    <div className="flex justify-end items-center">
      <Tooltip title="Row height" mouseEnterDelay={1} {...PopoverConfig}>
        <Popover
          {...PopoverConfig}
          placement="bottomRight"
          trigger={['click']}
          align={{ offset: [7, 0], overflow: { adjustX: false, adjustY: false } }}
          title="Row Height"
          content={TableSizeMenu}
        >
          <ColumnHeightOutlined className="config-icon" />
        </Popover>
      </Tooltip>
      <Tooltip title="Full Screen" mouseEnterDelay={1} {...PopoverConfig}>
        {fullscreen ? (
          <FullscreenExitOutlined className="config-icon" onClick={() => setFullscreen(!fullscreen)} />
        ) : (
          <FullscreenOutlined className="config-icon" onClick={() => setFullscreen(!fullscreen)} />
        )}
      </Tooltip>
      <Tooltip title="Reload" mouseEnterDelay={1} {...PopoverConfig}>
        <ReloadOutlined className="config-icon" onClick={() => getDataSource()} />
      </Tooltip>
      <Tooltip title="Column" mouseEnterDelay={1} {...PopoverConfig}>
        <Popover
          {...PopoverConfig}
          placement="bottomRight"
          trigger={['click']}
          align={{ offset: [7, 0], overflow: { adjustX: false, adjustY: false } }}
          title={
            <div className="flex justify-between items-center">
              <Checkbox
                className="select-none"
                indeterminate={selectedColumns.length > 0 ? selectedColumns.length !== columnsTitle.length : false}
                checked={selectedColumns.length === columnsTitle.length}
                onChange={e => {
                  const { checked } = e.target;
                  setSelectedColumns(checked ? columnsTitle : []);
                }}
              >
                All
              </Checkbox>
              <a onClick={() => setSelectedColumns(columnsTitle)}>Reset</a>
            </div>
          }
          content={
            <Checkbox.Group
              className="flex flex-col select-none"
              options={columnsTitle}
              value={selectedColumns}
              onChange={setSelectedColumns}
            />
          }
        >
          <NumberOutlined className="config-icon" />
        </Popover>
      </Tooltip>
      <Tooltip title="Border" mouseEnterDelay={1}>
        <BorderOuterOutlined
          className={`config-icon ${bordered && 'config-icon-active'}`}
          onClick={() => setBordered(!bordered)}
        />
      </Tooltip>
    </div>
  );

  return (
    <div className="list-table-view">
      <Fullscreen enabled={fullscreen} onChange={setFullscreen}>
        <div title="Container" className={`bg-white h-full w-full ${fullscreen && 'pt-8 pl-2 pr-2 overflow-auto'}`}>
          <div title="Toolbar" className="flex items-center justify-between mb-2">
            <span title="Toolbar Title" className="text-base font-medium">
              {props.toolbarTitle}
            </span>
            <div className="flex items-center justify-end">
              {props.addButton && (
                <Button type="primary" icon={<PlusOutlined />} onClick={props.addButtonClicked}>
                  {props.addButtonText}
                </Button>
              )}
              {props.addButton && props.tools && <Divider type="vertical" />}
              {props.tools && TableTools}
            </div>
          </div>

          {props.showSelectedCount && <SelectedPreview className="mb-2" ref={selectedPreviewRef} />}

          <DndProvider
            // @ts-ignore
            backend={HTML5Backend}
          >
            <Table
              style={{ overflow: 'scroll hidden' }}
              bordered={bordered}
              size={size}
              scroll={{ x: 'max-content' }} // fixed header y: table height px
              rowKey={(record, index) => _.get(record, props.rowKey) || index}
              loading={fetching}
              columns={_.filter(props.columns, (c: { title: string }) => _.includes(selectedColumns, c.title))}
              pagination={{ ...props.pagination, ...pagination }}
              dataSource={dataSource}
              onChange={handleTableChange}
              rowSelection={
                props.selectable !== true
                  ? undefined
                  : {
                      type: props.rowSelection ? props.rowSelection.type : 'checkbox',
                      onChange: (selectedRowKeys, selectedRows) => {
                        selectedPreviewRef.current?.setCount(selectedRowKeys.length);
                        if (props.onSelect) props.onSelect(selectedRowKeys, selectedRows);
                      },
                      getCheckboxProps: record => ({
                        disabled: props.rowSelection && props.rowSelection.disabled(record),
                        name: props.rowSelection && props.rowSelection.name(record)
                      })
                    }
              }
              components={props.draggable ? { body: { row: DraggableBodyRow } } : undefined}
              // @ts-ignore
              onRow={props.draggable ? (record, index) => ({ index, moveRow }) : props.onRow}
            />
          </DndProvider>
        </div>
      </Fullscreen>
    </div>
  );
});

type SelectedPreview = { count: number; setCount: (n: number) => void };
const SelectedPreview = forwardRef((props: { className?: string }, ref: React.Ref<SelectedPreview>) => {
  const [count, setCount] = useState(0);
  useImperativeHandle(ref, () => ({
    count,
    setCount
  }));
  if (count <= 0) return null;
  return (
    <Alert
      className={props.className}
      message={
        <span>
          Selected <span className="font-medium c-link">{count}</span> rows.
        </span>
      }
      type="info"
      showIcon
    />
  );
});

const ListTableView = withRouter(Component);
ListTableView.defaultProps = {
  bordered: true,
  rowKey: 'id',
  addButton: true,
  addButtonText: 'Add',
  tools: true,
  rowSelection: { type: 'checkbox', name: r => _.get(r, 'id'), disabled: r => _.get(r, 'active') !== true },
  selectable: false,
  showSelectedCount: true,
  draggable: false
};
export { ListTableView };
export default ListTableView;

// --------- Start Interfaces ---------

type TableSize = 'small' | 'middle' | 'large';
type RowSelectionType = 'checkbox' | 'radio';

interface GetDataParams {
  limit: number;
  offset: number;
  [x: string]: any;
}

interface Pagination {
  pageSize: number;
  current: number;
  total: number;
}

interface RowSelection {
  type: RowSelectionType;
  name(record: object): string;
  disabled(record: object): boolean;
}

type omitP = 'pageSize' | 'current' | 'total';
interface ListTableView {
  rowKey?: string;
  columns: ColumnsType;
  bordered?: boolean;
  pagination?: Omit<TablePaginationConfig, omitP>;
  getData(params: GetDataParams): Promise<{ rows: any[]; count: number }>;
  addButton?: boolean;
  addButtonText?: string;
  addButtonClicked?: () => void;
  tools?: boolean; // Table config buttons
  toolbarTitle?: string;
  rowSelection?: RowSelection;
  selectable?: boolean;
  showSelectedCount?: boolean;
  onSelect?(keys: React.ReactText[], rows: any[]): void;
  draggable?: boolean;
  onDragOver?(records: any[]): void;
  onRow?(
    record: any[],
    index: number
  ): {
    onClick?(e: any): void;
    onDoubleClick?(e: any): void;
    onContextMenu?(e: any): void;
    onMouseEnter?(e: any): void;
    onMouseLeave?(e: any): void;
  };
  wrappedComponentRef?: React.Ref<ListTableViewHandles>;
}

export type ListTableViewHandles = {
  getData?: ({ extra }: { extra: object }) => void;
};
type Props = ListTableView & RouteComponentProps;
