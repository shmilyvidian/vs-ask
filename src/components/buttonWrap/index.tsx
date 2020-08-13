import React from "react";
import { Button, Form, Row, Col } from "antd";
import { ButtonType } from "antd/lib/button";
import "./index.less";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";


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
const ButtonWrap = ({ btnInfos, isChecked}: IInfos) => {
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
                return (
                  // <Popover key={i} placement="top" content={o['tip']}>
                  <div
                    key={i}
                    onClick={() => onClick(item)}
                    className={`
                    button-wrapper-btn
                    button-wrapper-btn-${item.type}
                    ${item["isDelete"] && isChecked ? 'button-wrapper-btn-isDelete' : ''}
                    `}
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
                  // </Popover>
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
