import React from "react";
import { Form, Row, Col } from "antd";
import { ButtonType } from "antd/lib/button";
import "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import classnames from "classnames";


export type IBtn = {
  name: string;
  tip: string;
  disabled?: boolean;
  type: ButtonType;
  icon?: string;
  isDelete?: boolean;
  callback?: () => void;
};
export interface IInfos {
  btnInfos: IBtn[];
  isChecked: boolean;
}
const ButtonWrap = ({ btnInfos, isChecked }: IInfos) => {
  function onClick(btn: IBtn) {
    if (btn.callback) btn.callback();
  }
  return (
    <Form className="main__btn--form">
      <Row justify="start">
        <Col>

          <div className="button-wrapper">

            {btnInfos.length > 0
              ? btnInfos.map((item, i) => {
                const bt_cls = `button-wrapper-btn-${item.type}`
                const delete_cls = (item["isDelete"] && isChecked) ? 'button-wrapper-btn-isDelete' : ''
                return (
                  <>
                    <div
                      key={i}
                      onClick={() => onClick(item)}
                      className = {classnames(bt_cls,delete_cls,'button-wrapper-btn')}
                    >
                      <div className="button-wrap-btn-content">
                        {item["icon"] === "delete" && (
                          <div className={isChecked ? 'btn-icon-delete-active' : 'btn-icon-delete'}></div>
                        )}
                        {item["icon"] === "add" && (
                          <PlusOutlined
                            className="button-wrap-add-icon"
                          />

                        )}
                        <span className="button-wrap-add-text">{item["name"]}</span>
                      </div>
                    </div>
                  </>
                );
              })
              : null}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ButtonWrap;
