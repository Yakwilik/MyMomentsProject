import {ICommentProps, IMoment} from "../../../models/models";
import React, {useState} from "react";
import MomentFilter, {MomentFilterProps} from "../MomentFilter/MomentFilter";
import {useMoments} from "../../../hooks/useMoments";
import MomentList from "../MomentList/MomentList";


interface MomentsWithFilterProps {
    moments: IMoment[]
}
const MomentsWithFilter = ({moments}:MomentsWithFilterProps) => {

    const [filter, setFilter] = useState<MomentFilterProps>({query: "", sort: ""})

    const sortedAndSearchedMoments = useMoments(moments, filter.sort, filter.query )
    const deleteMoment = (moment: IMoment) => {
        moments.filter(p => p.id !== moment.id)
    }

    return (
        <div>
            <MomentFilter filter={filter} setFilter={setFilter}></MomentFilter>
            <MomentList onSubmit={deleteMoment} moments={sortedAndSearchedMoments}></MomentList>
        </div>
    );
}

export default  MomentsWithFilter