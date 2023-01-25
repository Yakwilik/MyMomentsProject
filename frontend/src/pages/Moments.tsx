import React, {useEffect, useState} from "react";
import {IMoment} from "../models/models";
import NewMomentForm from "../components/App/NewMomentForm/NewMomentForm";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {LIMIT, useMomentsQuery} from "../store/moments/momentsApi"
import MomentsWithFilter from "../components/App/MomentsWithFilter/MomentsWithFilter";
import {Loader} from "../components/UI/Loader/Loader";
import {getPageCount} from "../utils/pagination";
import {PaginatedData} from "../components/App/PaginatedData/PaginatedData";
import {useAppSelector} from "../hooks/useAppSelector";


// interface Moments
const Moments = () => {
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const {isLoading: momentsIsLoading, isError: momentsIsError, data: momentsData} = useMomentsQuery(page)
    const auth = useAppSelector(state => state.auth)
    const [modal, setModal] = useState(false)

    const createMoment = (newMoment: IMoment) => {
        setModal(false)
    }
    useEffect(() => {
        if (momentsData) {
            setTotalPages(getPageCount(LIMIT,momentsData.count))
        }
    }, [momentsIsLoading, momentsData])

    if (momentsIsError) {
        return (
            <div className={"text-center font-bold m-auto"}>
                    Не удалось загрузить моменты
            </div>)
    }
    return (
        <div className={"min-w-[67%] flex-col justify-center"}>
            {(auth.authorized) ? <MyButton onClick={()=> setModal(true)}>Создать момент</MyButton> : ""}
            <MyModal visible={modal} setModal={setModal}><NewMomentForm onSubmit={createMoment}/></MyModal>
            {momentsIsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/>
                </div>}
            {!momentsIsLoading && !momentsIsError && <MomentsWithFilter moments={momentsData!.results}></MomentsWithFilter>}
            {!momentsIsLoading && PaginatedData({
                    next: momentsData!.next,
                    previous:momentsData!.previous,
                    currentPage:page,
                    totalPages: totalPages,
                    callback:setPage})
            }
        </div>
    );
};

export default Moments;