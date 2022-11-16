import React, {useMemo, useRef, useState} from "react";
import {IMoment} from "../components/App/Moment/Moment";
import MomentList from "../components/App/MomentList/MomentList";
import NewMomentForm from "../components/App/NewMomentForm/NewMomentForm";
import MomentFilter ,{MomentFilterProps} from "../components/App/MomentFilter/MomentFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {useMoments} from "../hooks/useMoments";


// interface Moments
const Moments = () => {
    const [moments, setMoments] = useState<IMoment[]>([
        {title:"аа", text:"вв", id:0, image:"", comments:[
                {author:{username: "robot"}, text: "hellop"},
                {author:{username: "khasbulat"}, text: "goodbye"}]},
        {title:"бб", text:"бб", id:1, image:"", comments: []},
        {title:"вв", text:"аа", id:2, image:"", comments:[]}
    ])


    const [filter, setFilter] = useState<MomentFilterProps>({query: "", sort: ""})
    const [modal, setModal] = useState(false)

    const sortedAndSearchedMoments = useMoments(moments, filter.sort, filter.query )




    const createMoment = (newMoment: IMoment) => {
        setMoments([...moments, newMoment])
        setModal(false)
    }
    const deleteMoment = (moment: IMoment) => {
        setMoments(moments.filter(p => p.id !== moment.id))
    }

    return (
        <div className={"min-w-[67%] flex-col justify-center"}>
            <MyButton onClick={()=> setModal(true)}>Создать момент</MyButton>
            <MyModal visible={modal} setModal={setModal}><NewMomentForm onSubmit={createMoment}/></MyModal>
            <MomentFilter filter={filter} setFilter={setFilter}></MomentFilter>
            <MomentList onSubmit={deleteMoment} moments={sortedAndSearchedMoments}></MomentList>
        </div>
    );
};

export default Moments;