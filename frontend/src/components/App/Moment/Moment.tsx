import React, {FC, useState} from 'react';
import classes from './Moment.module.css'
import MyButton from "../../UI/button/MyButton";
import {ICommentProps, IMoment} from "../../../models/models";
import {CommentList} from "../CommentList/CommentList";
import MyInput from "../../UI/input/MyInput";
import {useLazyGetCsrfQuery, useLikeMutation} from "../../../store/moments/momentsApi";
import {useAppSelector} from "../../../hooks/useAppSelector";

interface IMomentElement {
    moment: IMoment
    onSubmit?: ((callback: IMoment) => void)
    // setComment:
}
const Moment:FC<IMomentElement>= ({moment, onSubmit, ...props}) => {
    // const [comments] = useMemo();
    const [like_moment, {isLoading}] = useLikeMutation()
    const [getCsrf, {isLoading: isCsrfLoading}] = useLazyGetCsrfQuery()
    const [comments, setComments] = useState(moment.comments)
    const auth = useAppSelector(state => state.auth)
    // const [like, toggleLike] = useState(false)
    function Like() {
        if (!auth.authorized) return
        getCsrf(false)
        like_moment(moment.id)
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
            <div className={"mr-auto flex items-center"}>
                <img alt={moment.author.user?.username} className={"inline-block w-[50px] h-[50px] rounded-full"} src={moment.author.avatar}/>
                <p className={"ml-5"}>{moment.author.user?.username}</p>
            </div>
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
            <div className={"align-bottom"}>
                {moment.is_liked && <img alt={"redHeart"} onClick={Like} src="Favorite.png" className={[classes.like_picture, "inline", "cursor-pointer"].join(" ")}/>}
                {!moment.is_liked && <img alt={"blackHeart"} onClick={Like} src="NotAssessed.png" className={[classes.like_picture, "inline cursor-pointer mr-[3px]"].join(" ")}/>}

                <span className={["pt-[5px]"].join(" ")}>
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