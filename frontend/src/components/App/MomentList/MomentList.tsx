import React, {InputHTMLAttributes} from 'react';
import Moment, {IMoment} from "../Moment/Moment";

interface MomentListProps {
    moments: IMoment[]
}

const MomentList = ({moments}: MomentListProps) => {
    return (
        <div>
            {moments.map(moment =>
                <Moment title={moment.title} text={moment.text} image={moment.image} id={moment.id}/>
            )}
        </div>
    );
};

export default MomentList;