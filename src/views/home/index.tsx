import React, { useState } from "react";
import ButtonWrap, { IBtn } from "components/buttonWrap";
import { useHistory } from "react-router";
import TableWrap, { DelFnType } from "components/tableWrap";
import ModalWrap, { IFooter } from "components/modalWrap/modalWrap";
import { InfoCircleFilled } from "@ant-design/icons";



import './index.less'

// 删除模板内容
const deleteDialogContent = (
  <div className="delete-wrapper">
    <div className="delete-top">
      <InfoCircleFilled className="delete-icon" /> 确定要删除吗？
		</div>
    <div className="delete-second">问题被删除之后不能撤销！</div>
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
      name: "删 除",
      tip: "删 除",
      type: "default",
      icon: "delete",
      isDelete: true,
      disabled: true,
      callback: () => {
      },
    },
  ];

  // 判断是否有选中
  let [isChecked,setIsChecked] = useState(false)
  const history = useHistory();
  const [btnInfos, setBtnInfos] = useState<IBtn[]>(infos);

  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const [okCancelFn, setOkCancelFn] = useState<{ fn: Function }>({
    fn: () => { },
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
      setIsChecked(false)
      okCancelFn.fn();
    },
    onCancel: () => {
      modalControl(false);
    },
  };
  function onCallback(isDelete: DelFnType) {
    console.log(isChecked)
    if (isDelete.isDel) {
      let origin = infos;
      let delbtn = origin[1];
      delbtn.disabled = false;
      // delbtn.isDelete = true;
      delbtn.callback = () => modalControl(true);

      setIsChecked(true)
      setBtnInfos([...origin]);
    } else {
      let origin = infos;
      let delbtn = origin[1];
      delbtn.disabled = true;
      // delbtn.isDelete = false;

      setIsChecked(false)
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
      <ButtonWrap btnInfos={btnInfos} isChecked={isChecked}/>
      {isChecked}
      <TableWrap callback={onCallback} />
      <ModalWrap
        modal_visible={confirmVisible}
        footer={confirmfooter}
        content={deleteDialogContent}
        type="info"
      />

      <div className="ask-endorsement">
      </div>
    </div>
  );
};

export default Home;
