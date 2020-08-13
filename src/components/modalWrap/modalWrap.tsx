import React from "react";
import { Modal, Button } from "antd";
import classnames from "classnames";

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

let _style = {
	btn: {
		marginRight: 30,
	},
	contain: {
		padding: "10px 20px",
		color: "black",
	},
};
const ModalWrap = ({ modal_visible, footer, content, type }: IModal) => {
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
					<div style={_style.btn}>
						<Button
							size="small"
							onClick={() => {
								footer.onCancel();
							}}
							className={classnames(footer.cancleClsName, {
								hide: !footer.cancleTxt,
							})}
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
							})}
						>
							{footer.okTxt}
						</Button>
					</div>
				) : null
			}
		>
			<div style={_style.contain}>{content}</div>
		</Modal>
	);
};

export default ModalWrap;
