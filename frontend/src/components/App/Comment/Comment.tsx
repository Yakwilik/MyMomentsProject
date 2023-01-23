import React, {FC} from 'react';
import classes from "./Comment.module.css"
import {ICommentProps} from "../../../models/models";

const Comment: FC<ICommentProps> = ({text, comment_author}) => {

    return (
    <div className={"w-[100%] pt-2"}>
        <div className={[" ", classes.CommentAuthor].join(" ")}>
            {comment_author.avatar? <img src={" "}/> : <span/>}
            <div>
            {comment_author?.user?.first_name && comment_author.user?.last_name ? [comment_author?.user?.first_name, comment_author.user?.last_name].join(" ") : comment_author.user?.username}
                <span className={["float-right", classes.Options].join(" ")}>...</span>
            </div>
        </div>
        <div className={classes.CommentText}>
            {text}
        </div>
    </div>)
};

export default Comment;