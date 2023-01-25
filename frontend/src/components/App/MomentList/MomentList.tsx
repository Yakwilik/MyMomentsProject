import React from 'react';
import Moment from "../Moment/Moment";
import  {IMoment} from "../../../models/models"

import './MomentList.css'

interface MomentListProps {
    moments?: IMoment[],
    onSubmit?: ((callback: IMoment) => void)
}

const MomentList = ({moments, onSubmit}: MomentListProps) => {
    if (!moments?.length) {
        return (<div className={"text-center font-bold m-auto"}>моменты не найдены</div>)
    }
    return (
        <div className={"flex justify-center flex-col"}>
            {/*<TransitionGroup >*/}
                {moments.map(moment =>
                    // <CSSTransition
                    //     classNames={"moment"}
                    //     timeout={500}
                    //     key={moment.id}
                    // >
                        <Moment key={moment.id} onSubmit={onSubmit}  moment={moment}/>
                    // </CSSTransition>

                )}
            {/*</TransitionGroup>*/}

        </div>
    );
};

export default MomentList;