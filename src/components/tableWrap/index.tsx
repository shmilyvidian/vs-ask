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

export const data: DataType[] = [
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

// const filterIcon = <CaretDownOutlined />;
// const columns: ColumnsType<DataType> = [
// 	{
// 		title: "标题",
// 		dataIndex: "name",
// 	},
// 	{
// 		title: "开始时间",
// 		dataIndex: "startTime",
// 		width: 200,
// 	},
// 	{
// 		title: "状态",
// 		dataIndex: "state",
// 		width: 200,
// 		filterIcon: filterIcon,
// 		filters: [
// 			{
// 				text: "已完成",
// 				value: 0,
// 			},
// 			{
// 				text: "处理中",
// 				value: 1,
// 			},
// 		],
// 		onFilter: (value: string | number | boolean, record: DataType) => {
// 			return record.state === value;
// 		},
// 		render: (_: any, record: DataType) => {
// 			return <span>{record.state === 0 ? "已完成" : "处理中"}</span>;
// 		},
// 	},
// ];

// const TableWrap = ({ callback }: ITable) => {
// 	const [selectedRowKeys, setRowKeys] = useState([]);
// 	const [innerData, setInnerData] = useState<DataType[]>(data);

// 	const rowSelection: TableRowSelection<DataType> = {
// 		selectedRowKeys,
// 		onChange: (selectedRowKeys: any, selectedRows: DataType[]) => {
// 			const delfn = () => {
// 				let remain = innerData;
// 				selectedRows.forEach((v) => {
// 					remain = remain.filter((l) => l.key !== v.key);
// 				});
// 				setInnerData(remain);
// 			};
// 			let isDel: boolean;
// 			if (selectedRowKeys.length > 0) {
// 				isDel = true;
// 				callback({
// 					delfn,
// 					isDel,
// 				});
// 			} else {
// 				isDel = false;
// 				callback({
// 					delfn,
// 					isDel,
// 				});
// 			}
// 			setRowKeys(selectedRowKeys);
// 		},
// 	};

// 	return (
// 		<Table
// 			rowSelection={rowSelection}
// 			columns={columns}
// 			dataSource={innerData}
// 		/>
// 	);
// };

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

  const filterTitle = (
    <Popover
      placement="bottomRight"
      autoAdjustOverflow
      content={
        <div className="filter-wrapper">
          <div
            onClick={() => handleclick(0)}
            style={{
              cursor: "pointer",
              color: filterState[0] ? "blue" : "black",
            }}
            className="filter-wrapper-top"
          >
            已完成
					</div>
          <div
            onClick={() => handleclick(1)}
            style={{
              cursor: "pointer",
              color: filterState[1] ? "blue" : "black",
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

  const chooseData = useMemo(() => {
    if (filterState.some((v) => v === true)) {
      return filterData;
    } else {
      return innerData;
    }
  }, [filterState, innerData, filterData]);

  const columns: ColumnsType<DataType> = [
    {
      title: "标题",
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
    },
    {
      title: filterTitle,
      dataIndex: "state",
      width: 200,
      render: (_: any, record: DataType) => {
        return <span>{record.state === 0 ? "已完成" : "处理中"}</span>;
      },
    },
  ];
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any, selectedRows: DataType[]) => {
      // 删除数据方法
      const delfn = () => {
        let remain = innerData;
        selectedRows.forEach((v) => {
          remain = remain.filter((l) => l.key !== v.key);
        });
        setInnerData(remain);
        if (filterData.length > 0) {
          setFilterData([]);
          setFilterState([false, false]);
        }
      };
      let isDel: boolean;
      if (selectedRowKeys.length > 0) {
        isDel = true;
        callback({
          delfn,
          isDel,
        });
      } else {
        isDel = false;
        callback({
          delfn,
          isDel,
        });
      }
      setRowKeys(selectedRowKeys);
    },
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={chooseData}
    ></Table>
  );
};

export default TableWrap;
