import React, { useState, useEffect } from "react"
import ButtonWrap, { IBtn } from 'components/buttonWrap'
import { useHistory } from "react-router"
import TableWrap from "components/tableWrap"

const Home = () => {
    const infos: IBtn[] = [
        { name: '新建问题', tip: '', type: 'primary', icon: 'add', callback: () => history.push('/add') },
        { name: '删除', tip: '删除', type: 'default', icon: 'delete', isDelete: false },
    ]
    const history = useHistory();
    const [isDelete, setDelete] = useState<Boolean>(false)
    const [btnInfos, setBtnInfos] = useState<IBtn[]>(infos)


    function onCallback (isDelete:boolean){
        isDelete && infos.forEach((o:IBtn, i:number) => i === 1 && (o.isDelete = true))
        setBtnInfos(infos)
        setDelete(isDelete)
    }

    return (
        <div className="vs-ask__home">
            <ButtonWrap btnInfos={btnInfos} />
            <TableWrap callback={onCallback}/>
        </div>
    )
}

export default Home