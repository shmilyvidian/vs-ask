import React from "react";
import { Button, Form, Row, Col } from "antd";
import { ButtonType } from "antd/lib/button";
import "./index.less";
const FormItem = Form.Item;

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
}
const ButtonWrap = ({ btnInfos }: IInfos) => {
	function onClick(btn: IBtn) {
		if (btn.callback) btn.callback();
	}
	return (
		<Form className="main__btn--form">
			<Row justify="start">
				<Col>
					<FormItem>
						{btnInfos.length > 0
							? btnInfos.map((o, i) => {
									return (
										// <Popover key={i} placement="top" content={o['tip']}>
										<Button
											key={i}
											onClick={() => onClick(o)}
											type={o["type"]}
											disabled={o["disabled"]}
											className={`buttonWrap-btn buttonWrap-btn__${
												o["type"]
											} m__r--10 ${
												o["isDelete"]
													? "buttonWrap-btn__isDelete"
													: ""
											}  `}
										>
											<div className="buttonWrap-btn__content">
												{o["icon"] && (
													<i
													// className={
													//     `buttonWrap-btn-icon ${o['isDelete'] ? 'buttonWrap-btn-icon__deleteActive': `buttonWrap-btn-icon__${o['icon']}`
													// }
													/>
												)}
												<span>{o["name"]}</span>
											</div>
										</Button>
										// </Popover>
									);
							  })
							: null}
					</FormItem>
				</Col>
			</Row>
		</Form>
	);
};

export default ButtonWrap;
