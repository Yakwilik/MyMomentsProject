import React, {useState} from 'react';
import classes from './Moment.module.css'

export interface IMoment {
    title: string,
    text: string,
    image: string
    id: number
}
// export default IMoment;
const Moment = (props: IMoment) => {
    const [like, toggleLike] = useState(true)

    function Like() {
        if (like) {
            toggleLike(false)
        } else {
            toggleLike(true)
        }
    }
    return (
        <div className={classes.momentWrapper}>
            <picture onDoubleClick={Like}>
                <source className={classes.imageSize}
                    srcSet="logo512.png"
                    type="image/webp"
                />
                <img src="logo512.png"  alt="" className={classes.imageSize}   />
            </picture>
            <div className={classes.titleStyle}>{props.title}</div>
            <div>{props.text}</div>
            {like && <p>Like</p>}
        </div>

    );
};

export default Moment;