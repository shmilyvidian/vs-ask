import React from "react";
import { Modal, Button } from "antd";
import classnames from "classnames";

import './index.less'

export interface IFooter {
  okClsName: string;
  okTxt: string;
  cancleClsName: string;
  cancleTxt: string;
  onOk: Function;
  onCancel: Function;
}

interface IModal {
  modal_visible: boolean;
  footer: IFooter;
  content: any;
  type: string;
}

const ModalWrap = ({
  modal_visible,
  footer,
  content,
  type
}: IModal) => {
  return (
    <Modal
      visible={modal_visible}
      closable={false}
      wrapClassName="ModalWrap__style"
      onCancel={() => {
        footer.onCancel();
      }}
      title="删除"
      footer={
        footer ? (
          <div className="footer-wrapper">
            <Button
              size="small"
              onClick={() => {
                footer.onCancel();
              }}
              className={classnames(footer.cancleClsName, {
                hide: !footer.cancleTxt,
              },'footer-btn-common','footer-cancel')}
            >
              {footer.cancleTxt}
            </Button>
            <Button
              size="small"
              onClick={() => {
                footer.onOk();
              }}
              className={classnames(footer.okClsName, {
                hide: !footer.okTxt || type === "info",
              },'footer-btn-common')}
            >
              {footer.okTxt}
            </Button>
          </div>
        ) : null
      }
    >
      {content}
    </Modal>
  );
};

export default ModalWrap;
