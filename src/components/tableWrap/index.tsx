import { Table } from "antd";
import React, { useState } from "react";
import { TableRowSelection, ColumnsType } from "antd/lib/table/interface";
import { CaretDownOutlined } from "@ant-design/icons";

interface ITable {
	callback: any;
}

export interface DataType {
	key: number;
	name: string;
	startTime: string;
	state: number;
}

export interface DelFnType {
	isDel: boolean;
	delfn: () => void;
}

const data: DataType[] = [
	{
		key: 0,
		name: "文字消息发出后无法撤回",
		startTime: "2020-08-06",
		state: 0,
	},
	{ key: 1, name: "认证不成功", startTime: "2020-08-06", state: 1 },
];

const filterIcon = <CaretDownOutlined />;
const columns: ColumnsType<DataType> = [
	{
		title: "标题",
		dataIndex: "name",
	},
	{
		title: "开始时间",
		dataIndex: "startTime",
		width: 200,
	},
	{
		title: "状态",
		dataIndex: "state",
		width: 200,
		filterIcon: filterIcon,
		filters: [
			{
				text: "已完成",
				value: 0,
			},
			{
				text: "处理中",
				value: 1,
			},
		],
		onFilter: (value: string | number | boolean, record: DataType) => {
			return record.state === value;
		},
		render: (_: any, record: DataType) => {
			return <span>{record.state === 0 ? "已完成" : "处理中"}</span>;
		},
	},
];

const TableWrap = ({ callback }: ITable) => {
	const [selectedRowKeys, setRowKeys] = useState([]);
	const [innerData, setInnerData] = useState<DataType[]>(data);

	const rowSelection: TableRowSelection<DataType> = {
		selectedRowKeys,
		onChange: (selectedRowKeys: any, selectedRows: DataType[]) => {
			const delfn = () => {
				let remain = innerData;
				selectedRows.forEach((v) => {
					remain = remain.filter((l) => l.key !== v.key);
				});
				setInnerData(remain);
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
			dataSource={innerData}
		/>
	);
};

export default TableWrap;
