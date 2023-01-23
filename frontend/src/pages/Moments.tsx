import React, {useMemo, useRef, useState} from "react";
import {IMoment} from "../models/models";
import MomentList from "../components/App/MomentList/MomentList";
import NewMomentForm from "../components/App/NewMomentForm/NewMomentForm";
import MomentFilter ,{MomentFilterProps} from "../components/App/MomentFilter/MomentFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {useMoments} from "../hooks/useMoments";
import {useCommentsQuery, useMomentsQuery} from "../store/moments/momentsApi"
import MomentsWithFilter from "../components/App/MomentsWithFilter/MomentsWithFilter";


// interface Moments
const Moments = () => {
    // const [moments, setMoments] = useState<IMoment[]>([
    //     {title:"аа", content:"вв", id:0, image:"t", comments:[
    //             {author:{username: "robot"}, text: "hellop"},
    //             {author:{username: "khasbulat"}, text: "goodbye"}]},
    //     {title:"бб", content:"бб", id:1, image:"e", comments: []},
    //     {title:"вв", content:"аа", id:2, image:"q", comments:[]}
    // ])

    const {isLoading: momentsIsLoading, isError: momentsIsError, data: momentsData} = useMomentsQuery("")

    console.log(momentsData)

    const [modal, setModal] = useState(false)

    const createMoment = (newMoment: IMoment) => {
        // setMoments([...moments, newMoment])
        setModal(false)
    }

    if (momentsIsError) {
        return (
            <div className={"text-center font-bold m-auto"}>
                    Не удалось загрузить моменты
            </div>)
    }
    return (
        <div className={"min-w-[67%] flex-col justify-center"}>
            <MyButton onClick={()=> setModal(true)}>Создать момент</MyButton>
            <MyModal visible={modal} setModal={setModal}><NewMomentForm onSubmit={createMoment}/></MyModal>
            {momentsIsLoading && <p className="text-center">Loading...</p>}
            {!momentsIsLoading && !momentsIsError && <MomentsWithFilter moments={momentsData!}></MomentsWithFilter>}
        </div>
    );
};

export default Moments;