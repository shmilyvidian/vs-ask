import React, { useState } from "react";
import ButtonWrap, { IBtn } from "components/buttonWrap";
import { useHistory } from "react-router";
import TableWrap, { DelFnType } from "components/tableWrap";
import ModalWrap, { IFooter } from "components/modalWrap/modalWrap";
import { InfoCircleFilled } from "@ant-design/icons";

const content = (
	<div>
		<div>
			<InfoCircleFilled style={{ color: "#faa64b" }} /> 确定要删除吗？
		</div>
		<div>问题被删除之后不能撤销</div>
	</div>
);

const Home = () => {
	const infos: IBtn[] = [
		{
			name: "新建问题",
			tip: "",
			type: "primary",
			icon: "add",
			callback: () => history.push("/add"),
		},
		{
			name: "删除",
			tip: "删除",
			type: "default",
			icon: "delete",
			isDelete: false,
			disabled: true,
			callback: () => {},
		},
	];
	const history = useHistory();
	const [btnInfos, setBtnInfos] = useState<IBtn[]>(infos);

	const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

	const [okCancelFn, setOkCancelFn] = useState<{ fn: Function }>({
		fn: () => {},
	});

	const modalControl = (v: boolean) => {
		setConfirmVisible(v);
	};
	const confirmfooter: IFooter = {
		okClsName: "ant-btn-primary",
		okTxt: "确定",
		cancleClsName: "",
		cancleTxt: "取消",
		onOk: () => {
			okCancelFn.fn();
		},
		onCancel: () => {
			modalControl(false);
		},
	};
	function onCallback(isDelete: DelFnType) {
		if (isDelete.isDel) {
			let origin = infos;
			let delbtn = origin[1];
			delbtn.disabled = false;
			delbtn.isDelete = true;
			delbtn.callback = () => modalControl(true);
			setBtnInfos([...origin]);
		} else {
			let origin = infos;
			let delbtn = origin[1];
			delbtn.disabled = true;
			delbtn.isDelete = false;
			setBtnInfos([...origin]);
		}
		const fn = () => {
			isDelete.delfn();
			modalControl(false);
		};
		setOkCancelFn({ fn });
	}
	return (
		<div className="vs-ask__home">
			<ButtonWrap btnInfos={btnInfos} />
			<TableWrap callback={onCallback} />
			<ModalWrap
				modal_visible={confirmVisible}
				footer={confirmfooter}
				content={content}
				type="info"
			/>
		</div>
	);
};

export default Home;
