import React, { useState, useMemo } from "react";
import { Form, Input, Button, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import "./add.less";
import { data, DataType } from "components/tableWrap";

const Add = () => {
	const history = useHistory();
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 },
	};

	const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
		required: "${label}是必填项!",
		types: {
			// eslint-disable-next-line no-template-curly-in-string
			email: "${label} is not validate email!",
			// eslint-disable-next-line no-template-curly-in-string
			number: "${label} is not a validate number!",
		},
		number: {
			// eslint-disable-next-line no-template-curly-in-string
			range: "${label} must be between ${min} and ${max}",
		},
	};
	const onFinish = (values: any) => {
		let orign = data;
		const date = new Date();
		const starttime = `${date.getFullYear()}-${
			date.getMonth() + 1
		}-${date.getDate()}`;
		if (defaultTitle) {
			const ob = history.location.state as { key: number };
			const key = ob.key;
			orign.forEach((v) => {
				if (v.key === key) {
					v.name = values.user.name;
					v.startTime = starttime;
				}
			});
		} else {
			const item: DataType = {
				key: Math.random() + Date.now(),
				state: 1,
				name: values.user.name,
				startTime: starttime,
			};
			orign.push(item);
		}
		history.push("/");
	};
	const [fileList, setFileList] = useState<any[]>([]);
	const uploadButton = (
		<div>
			<PlusOutlined />

			<div className="ant-upload-text">最多可以上传3张，支持JPG、PNG</div>
		</div>
	);
	const normFile = (e: any) => {
		//验证
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};
	const [customFilist, setCustomFilist] = useState([]);
	const handleChange = (e: any) => {
		const file = e.file;
		const fileList = e.fileList;
		if (file.status !== "uploading") {
		} else {
			fileList.forEach((v: any) => {
				v.percent = 100;
				v.status = "done";
			});
		}
		setCustomFilist(fileList);
	};
	const defaultTitle = useMemo(() => {
		let v;
		if (history.location.state) {
			let t = history.location.state as { name: string };
			v = t.name;
		}
		return v;
	}, []);
	return (
		<Form
			{...layout}
			name="nest-messages"
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<Form.Item
				name={["user", "name"]}
				label="标题"
				rules={[{ required: true }]}
				initialValue={defaultTitle}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={["user", "introduction"]}
				label="问题描述"
				rules={[{ required: true }]}
			>
				<Input.TextArea />
			</Form.Item>
			<Form.Item name={["user", "image"]} label="图片">
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					fileList={fileList}
					// onPreview={handlePreview}
					onChange={({ fileList }) => setFileList(fileList)}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
			</Form.Item>
			<Form.Item
				valuePropName="fileList"
				getValueFromEvent={normFile}
				name={["user", "email"]}
				label="附件"
			>
				<Upload
					multiple
					customRequest={(e) => console.log(e)}
					onChange={handleChange}
					fileList={customFilist}
					// action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				>
					<Button type="primary">
						<UploadOutlined /> 上传附件
					</Button>
					<span className="fileTips">
						最多可以上传5份文件，每个大小不超过10M
					</span>
				</Upload>
			</Form.Item>
			<Form.Item name={["user", "telphone"]} label="回访电话">
				<Input />
			</Form.Item>
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type="primary" htmlType="submit" className="m__r--10">
					提交
				</Button>
				<Button htmlType="button" onClick={() => history.goBack()}>
					取消
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Add;
