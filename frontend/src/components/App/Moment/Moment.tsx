import React, {FC, useState} from 'react';
import classes from './Moment.module.css'
import MyButton from "../../UI/button/MyButton";
import {ICommentProps, IMoment} from "../../../models/models";
import {CommentList} from "../CommentList/CommentList";
import MyInput from "../../UI/input/MyInput";


interface IMomentElement {
    moment: IMoment
    onSubmit?: ((callback: IMoment) => void)
    // setComment:
}
const Moment:FC<IMomentElement>= ({moment, onSubmit, ...props}) => {
    // const [comments] = useMemo();
    const [comments, setComments] = useState(moment.comments)
    const [like, toggleLike] = useState(false)
    function Like() {
        if (like) {
            toggleLike(false)
        } else {
            toggleLike(true)
        }
    }
    function Comment( event: React.KeyboardEvent<HTMLInputElement>) {
        if (comments == null) {
            return;
        }
        if (event.key === 'Enter') {
            const newComment:  ICommentProps =
                {
                    comment_author:{id: 1, avatar:""},
                    text: event.currentTarget.value
                }
                if (!newComment.text.length) {
                    return
                }
            setComments([...comments, newComment])
            event.currentTarget.value = ""
        }
    }
    return (
        <div className={classes.momentWrapper}>
            <picture onDoubleClick={Like}>
                <source className={classes.imageSize}
                    srcSet={moment.image}
                    type="image/webp"
                />
                <img src={moment.image}  alt={moment.content} className={classes.imageSize}   />
            </picture>
            <div className={classes.titleStyle}>{}</div>
            <div className="font-bold text-center my-[10px]">{moment.title}</div>
            <div className="my-[10px]">{moment.content}</div>
            <div className={"ml-auto"}>
                {moment.is_mine && <MyButton onClick={()=>{onSubmit!(moment)}}>Удалить</MyButton>}
            </div>
            <div>
                <span className={classes.liked_before} onClick={()=> console.log("click")}>
                    {moment.likes}
                </span>
            </div>
            {moment.is_liked && <p>Like</p>}
            <div className={"border w-[100%] border-black mt-[5px]"}></div>
            <CommentList comments={comments!}></CommentList>
            <MyInput type={"text"} onKeyDown={Comment} className={"w-[100%]"}></MyInput>
        </div>

    );
};

export default Moment;