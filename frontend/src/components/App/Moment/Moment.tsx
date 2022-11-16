import React, {FC, useState} from 'react';
import classes from './Moment.module.css'
import MyButton from "../../UI/button/MyButton";

export interface IMoment {
    title: string,
    text: string,
    image: string
    id: number
}

interface IMomentElement {
    moment: IMoment
    onSubmit?: ((callback: IMoment) => void)

}
const Moment:FC<IMomentElement>= ({moment, onSubmit, ...props}) => {
    const [like, toggleLike] = useState(false)
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
            <div className={classes.titleStyle}>{}</div>
            <div>{moment.title}</div>
            <div>{moment.text}</div>
            <div className={"ml-auto"}>
                <MyButton onClick={()=>{onSubmit!(moment)}}>Удалить</MyButton>
            </div>

            {like && <p>Like</p>}
        </div>

    );
};

export default Moment;