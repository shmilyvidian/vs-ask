import React, { useState, useMemo } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

import "./add.less";
import { data, DataType } from "components/tableWrap";
import { UploadFile } from "antd/lib/upload/interface";


import deleteImg from '../../assets/svg/delete.svg'
import download from '../../assets/svg/download.svg'
import success from '../../assets/svg/success.svg'
import fail from '../../assets/svg/fail.svg'

import jpg1 from '../../assets/image/1.jpg';
import jpg2 from '../../assets/image/2.jpg';
import FormItem from "antd/lib/form/FormItem";


const Add = () => {
  const history = useHistory();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "必填项!",
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
    if (defaultTitle || defaultIntroduction || defaultTelphone) {
      const ob = history.location.state as { key: number };
      const key = ob.key;
      orign.forEach((v) => {
        if (v.key === key) {
          v.name = values.user.name;
          v.startTime = starttime;
          v.introduction = values.user.introduction;
          v.telphone = values.user.telphone;
        }
      });
    }
    else {
      const item: DataType = {
        key: Math.random() + Date.now(),
        state: 1,
        name: values.user.name,
        startTime: starttime,
        introduction: values.user.introduction,
        telphone: values.user.telphone
      };
      orign.push(item);
    }
    history.push("/");
  };

  const titleMaxLength = 20;
  const introductionMaxLength = 200;
  const [titleInputLenth, setTitleInputLenth] = useState<Number>(0);
  const [introdInputLenth, setIntrodInputLenth] = useState<Number>(0);
  const titleHandleChange = (e: any) => {
    const length = e.target.value.length;
    e.target.name === 'title' ? setTitleInputLenth(length) : setIntrodInputLenth(length);
  }

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
  const [customFilist, setCustomFilist] = useState<any[]>([]);

  // 上传附件
  const handleChange = (e: any) => {
    if (customFilist.length === 5) {
      message.error('最多上传5份附件')
      return
    }
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
      // 显示默认图片
      setFileList([
        {
          uid: '-1',
          name: '1.jpg',
          status: 'done',
          url: jpg1
        },
        {
          uid: '-2',
          name: '2.jpg',
          status: 'done',
          url: jpg2
        }
      ])

      // 显示默认附件
      setCustomFilist([
        {
          uid: '1',
          name: '附件名称1.pdf',
          status: 'done',
          response: 'Server Error 500',
          url: 'http://www.baidu.com/xxx.png'
        },
        {
          uid: '2',
          name: '附件名称2.pdf',
          status: 'error',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          uid: '3',
          name: '附件名称3.pdf',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png',
        },
      ])
    }
    return v;
  }, [history.location.state]);
  const defaultIntroduction = useMemo(() => {
    let v;
    if (history.location.state) {
      let t = history.location.state as { introduction: string };
      v = t.introduction;
    }
    return v;
  }, [history.location.state]);

  const defaultTelphone = useMemo(() => {
    let v;
    if (history.location.state) {
      let t = history.location.state as { telphone: string };
      v = t.telphone;
    }
    return v;
  }, [history.location.state]);




  return (
    <Form
      {...layout}
      name="nest-messages"
      className="form-wrapper"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item>
        <div className={defaultTitle ? 'title-wrapper' : 'hidden'}>
          编辑内容
        </div>
      </Form.Item>
      <Form.Item
        name={["user", "name"]}
        label="标题"
        rules={[
          { required: true },
          {
            max: 20,
            message: "标题内容不能超过20个字符"
          }
        ]}
        initialValue={defaultTitle}
      >
        <div>
          <Input className="input-textarea" placeholder="请输入标题" name="title" onChange={titleHandleChange} />
          <span className="length-tips">{titleInputLenth}/{titleMaxLength}</span>
        </div>
      </Form.Item>
      <Form.Item
        name={["user", "introduction"]}
        label="问题描述"
        rules={[{ required: true },
        {
          max: 200,
          message: "问题描述不能超过200个字符"
        }
        ]}
        initialValue={defaultIntroduction}
      >
        <div>
          <Input.TextArea rows={7} className="input-textarea" name="introduction" placeholder="请输入问题描述" onChange={titleHandleChange} />
          <span className="length-tips">{introdInputLenth}/{introductionMaxLength}</span>
        </div>

      </Form.Item>
      <Form.Item className="img-upload" name={["user", "image"]} label="图片">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          // onPreview={handlePreview}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name={["user", "file"]}
        label="附件"
        className="file-upload-btn"
      >
        <Upload
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <div className="file-list">
          <ul className="file-list-wrapper">
            <li className="titleName">附件名称</li>
            <li className="uploadState">上传状态</li>
            <li className="operate">操作</li>
          </ul>
          <div className="file-item-wrapper">
            {customFilist.map((v, i) => {
              return (
                <div className="file-item" key={`f` + i}>
                  <div className="title-name-item">
                    <FolderOpenOutlined className="title-name-item-icon" />
                    <div className="title-name-item-text">{v.name}</div>
                  </div>
                  <div className="uploadState">
                    {
                      v.status === 'done' ? <img className="success" src={success} alt="" /> : <img className="error" src={fail} alt="" />
                    }
                    {v.status === 'done' ? '成功' : '失败'}
                  </div>
                  <div
                    className="operate"
                  >
                    <a href='../../assets/image/test.txt' download>
                      <img src={download} className="operate-enclosure operate-enclosure-download" alt="" />
                    </a>
                    <img className="operate-enclosure operate-enclosure-delete" src={deleteImg}
                      alt=""
                      onClick={() => {
                        customFilist.splice(i, 1);
                        setCustomFilist([...customFilist]);
                      }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Form.Item>
      <Form.Item name={["user", "telphone"]}
        label="回访电话"
        initialValue={defaultTelphone}
        rules={[
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'
          }
        ]}
      >
        <Input className="input-textarea" placeholder="请输入回访电话" />
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
