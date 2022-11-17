import Moment, {IMoment} from "../Moment/Moment";
import Comment, {ICommentProps} from "../Comment/Comment";
import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

interface CommentListProps {
    comments: ICommentProps[]
}

export const CommentList = ({comments}:CommentListProps) => {
    if (!comments.length) {
        return (<div className={"text-center font-bold m-auto pt-2"}>комментарии не найдены</div>)
    }
    return (<div className={"w-[100%]"}>
        <TransitionGroup>
            {comments.map(comment =>
                <CSSTransition
                    classNames={"moment"}
                    timeout={500}
                    key={[comment.text, Date.now()].join(" ")}
                >
                    <Comment  author={comment.author} text={comment.text}/>
                </CSSTransition>

            )}
        </TransitionGroup>

    </div>
    );
}