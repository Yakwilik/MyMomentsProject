import {IMoment} from "../../../models/models";
import Comment from "../Comment/Comment";
import {ICommentProps} from "../../../models/models"
import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

interface CommentListProps {
    comments: ICommentProps[]
}

export const CommentList = ({comments}:CommentListProps) => {
    if (comments == null || !comments.length) {
        return (<div className={"text-center font-bold m-auto pt-2"}>комментарии не найдены</div>)
    }
    return (<div className={"w-[100%]"}>
        <TransitionGroup>
            {comments.map(comment =>
                <CSSTransition
                    classNames={"comment"}
                    timeout={500}
                    key={comment.id}
                >
                    <Comment  comment_author={comment.comment_author} text={comment.text}/>
                </CSSTransition>

            )}
        </TransitionGroup>

    </div>
    );
}