import { Table } from "antd"
import React, { useState } from "react"

interface ITable {
    callback: (isDelete: boolean) => void
}

const TableWrap = ({callback}:ITable) => {
    const [ selectedRowKeys, setRowKeys ] = useState([])
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys:any, selectedRows:any) => {
            console.log(selectedRowKeys,'selectedRowKeys', callback)
            if(selectedRowKeys.length){
                callback(true)
            }else{
                callback(false)
            }
            setRowKeys(selectedRowKeys)
        },
      };
    const columns = [
    {
        title: '标题',
        dataIndex: 'name',
    },
    {
        title: '开始时间',
        dataIndex: 'age',
        width: 200,
    },
    {
        title: '状态',
        dataIndex: 'address',
        width: 200,
    },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <Table rowSelection={rowSelection}  columns={columns} dataSource={data} />
    )
}

export default TableWrap