export interface IUser {
    first_name: string,
    last_name: string,
    username: string,
}

export interface IProfile {
    avatar : string,
    id : number,
    user?: IUser
}

export interface IMoment {
    id: number;
    title: string;
    content: string;
    is_liked?: boolean;
    is_mine?: boolean;
    url?: string;
    created_date?: Date;
    likes?: number;
    image: string;
    author: IProfile;
    comments: ICommentProps[]
}

export interface ICommentProps {
    id?: number
    comment_author : IProfile
    text : string
}

export interface PaginationResponse<T> {
    count: number;
    next?: string;
    previous?: string;
    results: T[];
}