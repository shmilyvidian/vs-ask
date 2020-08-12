import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import ReactDOM from 'react-dom';
import classnames from 'classnames';


interface IFooter {
    okClsName: string,
    okTxt: string,
    cancleClsName: string,
    cancleTxt: string,
    onOk: () => {},
    onCancel: () => {}
}

interface IModal {
    modal_visible: boolean
    footer: IFooter
    content: any
    type: string
}

const ModalWrap = ({ modal_visible, footer, content, type }: IModal) => {
    const [visible, setVisible] = useState(modal_visible)
    function onOk() {
        typeof footer.onOk === 'function' && footer.onOk()
        setVisible(false)

    }
    function onCancel() {
        typeof footer.onCancel === 'function' && footer.onCancel()
        setVisible(false)
    }

    let _style = {
        btn: {
            marginRight: 30
        },
        contain: {
            padding: '10px 20px',
            color: 'black'
        }
    }
    try {
        return ReactDOM.createPortal(
            <Modal
                visible={visible}
                closable={false}
                wrapClassName='ModalWrap__style'
                onCancel={e => {
                    setVisible(false)
                }}
                footer={footer ? (
                    <div style={_style.btn}>
                        <Button size="small" onClick={e => { onCancel() }} className={classnames(footer.cancleClsName, { 'hide': !footer.cancleTxt })}>{footer.cancleTxt}</Button>
                        <Button size="small" onClick={e => { onOk() }} className={classnames(footer.okClsName, { 'hide': !footer.okTxt || type == 'info' })}>{footer.okTxt}</Button>
                    </div>
                ) : null}
            >
                <div style={_style.contain}>
                    {content}
                </div>
            </Modal>, document.body)
    } catch (e) {
        throw (e)
        console.error(e)
    }
}

export default ModalWrap
