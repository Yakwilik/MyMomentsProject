import React, {FC} from 'react';
import {IUser} from "../User/User";
import classes from "./Comment.module.css"

export interface ICommentProps {
    author : IUser
    text:string
}

const Comment: FC<ICommentProps> = ({text, author}) => {

    return (
    <div className={"w-[100%] pt-2"}>
        <div className={[" ", classes.CommentAuthor].join(" ")}>
            {author.avatarImage? <img src={" "}/> : <span/>}
            <div>
            {author.name && author.surname ? [author.name, author.surname].join(" ") : author.username}
                <span className={["float-right", classes.Options].join(" ")}>...</span>
            </div>
        </div>
        <div className={classes.CommentText}>
            {text}
        </div>
    </div>)
};

export default Comment;