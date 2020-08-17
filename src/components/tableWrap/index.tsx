import { Table, Popover } from "antd";
import React, { useState, useMemo } from "react";
import { TableRowSelection, ColumnsType } from "antd/lib/table/interface";
import { CaretDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import './index.less'


interface ITable {
  callback: any;
}

export interface DataType {
  key: number;
  name: string;
  startTime: string;
  state: number;
  introduction: string;
  telphone: string;
}

export interface DelFnType {
  isDel: boolean;
  delfn: () => void;
}

export let data: DataType[] = [
  {
    key: 0,
    name: "文字消息发出后无法撤回",
    startTime: "2020-08-06",
    state: 0,
    introduction: "ce",
    telphone: "18565971256"
  },
  { key: 1, name: "认证不成功", startTime: "2020-08-06", state: 1, introduction: "测试", telphone: "13965971356" },
];

const TableWrap = ({ callback }: ITable) => {
  const [selectedRowKeys, setRowKeys] = useState([]);
  const [innerData, setInnerData] = useState<DataType[]>(data);
  const [filterData, setFilterData] = useState<DataType[]>([]);
  const [filterState, setFilterState] = useState([false, false]);
  const handleclick = (v: number) => {
    let arr = [false, false];
    arr[v] = !filterState[v];
    setRowKeys([]);
    setFilterState(arr);
    if (!filterState[v]) {
      const newData = innerData.filter((f) => f.state === v);
      console.log(newData);
      setFilterData(newData);
    } else {
      setFilterData([]);
    }
  };

  // 过滤器自定义render
  const filterTitle = (
    <Popover
      placement="bottomRight"
      autoAdjustOverflow
      content={
        <div className="filter-wrapper">
          <div
            onClick={() => handleclick(-1)}
            style={{
              cursor: "pointer",
              color: filterState[-1] ? "#1890ff" : "#606266",
            }}
            className="filter-wrapper-top"
          >
            全部
					</div>
          <div
            onClick={() => handleclick(0)}
            style={{
              cursor: "pointer",
              color: filterState[0] ? "#1890ff" : "#606266",
            }}
            className="filter-wrapper-top"
          >
            已完成
					</div>
          <div
            onClick={() => handleclick(1)}
            style={{
              cursor: "pointer",
              color: filterState[1] ? "#1890ff" : "#606266",
            }}
            className="font-color"
          >
            处理中
					</div>
        </div>
      }
      trigger={["click", "hover"]}
    >
      <span style={{ cursor: "pointer" }}>
        <span>状态</span>
        <CaretDownOutlined
          style={{
            color: "#c1c5cd",
          }}
          className="mr10"
        />
      </span>
    </Popover>
  );

  const tableHeader = (
    <div className="table-height">标题</div>
  )

  // 选中数据
  const chooseData = useMemo(() => {
    if (filterState.some((v) => v === true)) {
      return filterData;
    } else {
      return innerData;
    }
  }, [filterState, innerData, filterData]);

  // 每行数据内容设置 支持自定义
  const columns: ColumnsType<DataType> = [
    {
      title: tableHeader,
      dataIndex: "name",
      render: (_: any, record: DataType) => {
        return (
          <span>
            <Link
              className="link-class"
              to={{ pathname: "/add", state: { name: record.name, introduction: record.introduction, telphone: record.telphone, key: record.key } }}
            >
              {record.name}
            </Link>
          </span>
        );
      },
    },
    {
      title: "开始时间",
      dataIndex: "startTime",
      width: 200,
      align: 'center'
    },
    {
      title: filterTitle,
      dataIndex: "state",
      width: 200,
      align: 'right',
      render: (_: any, record: DataType) => {
        return <span>{record.state === 0 ? "已完成" : "处理中"}</span>;
      },
    },
  ];



  // checkbox设置
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    columnWidth: 34,
    onChange: (selectedRowKeys: any, selectedRows: DataType[]) => {
      // delfn(selectedRows)

      // 删除数据方法
      const delfn = () => {
        let remain = innerData;
        selectedRows.forEach((v) => {
          remain = remain.filter((l) => l.key !== v.key);
        });
        setInnerData(remain);

        // 保持数据同步
        data = remain
        if (filterData.length > 0) {
          setFilterData([]);
          setFilterState([false, false]);
        }
      };

      // 回调方法
      callback({
        delfn,
        isDel: selectedRowKeys.length > 0,
      });
      setRowKeys(selectedRowKeys);
    },
  };

  // 点击当前行选中 官方例子
  const onClickRow = (record: {
    key: never
  }) => {
    const list = [...selectedRowKeys];
    if (list.indexOf(record.key) >= 0) {
      list.splice(list.indexOf(record.key), 1);
    } else {
      list.push(record.key);
    }

    // 返回当前是否操作删除状态
    callback({
      isDel: list.length > 0,
    });
    setRowKeys(list);
  }

  // 每行操作
  const onRow = (record: any) => {
    return {
      onClick: () => {
        onClickRow(record)
      },
    }
  }

  return (
    <Table
      className='list-table'
      rowSelection={rowSelection}
      columns={columns}
      dataSource={chooseData}
      pagination={false}
      onRow={onRow}
    ></Table>
  );
};

export default TableWrap;
