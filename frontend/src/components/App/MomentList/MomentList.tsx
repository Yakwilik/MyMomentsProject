import React, {InputHTMLAttributes} from 'react';
import Moment, {IMoment} from "../Moment/Moment";
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import './MomentList.css'

interface MomentListProps {
    moments: IMoment[],
    onSubmit?: ((callback: IMoment) => void)
}

const MomentList = ({moments, onSubmit}: MomentListProps) => {
    if (!moments.length) {
        return (<div className={"text-center font-bold m-auto"}>моменты не найдены</div>)
    }
    return (
        <div className={"flex justify-center"}>
            <TransitionGroup >
                {moments.map(moment =>
                    <CSSTransition
                        classNames={"moment"}
                        timeout={500}
                        key={moment.id}
                    >
                        <Moment onSubmit={onSubmit}  moment={moment}/>
                    </CSSTransition>

                )}
            </TransitionGroup>

        </div>
    );
};

export default MomentList;