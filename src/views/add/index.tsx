import React, { useState } from "react"
import { Form, Input, Button, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";


const Add = () => {
    const history = useHistory()
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const onFinish = (values: any) => {
        console.log(values);
    };
    const [fileList, setFileList] = useState<any[]>([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },])
    const uploadButton = (
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="标题" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="问题描述" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="图片" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    // onPreview={handlePreview}
                    onChange={({ fileList })=>setFileList(fileList)}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item name={['user', 'email']} label="附件" rules={[{ type: 'email' }]}>
                <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>
                    <Button type='primary'>
                        <UploadOutlined /> 上传附件
                    </Button>
                </Upload>
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="回访电话">
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
    )
}

export default Add