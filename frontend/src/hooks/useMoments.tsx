import {useMemo} from 'react'
import {IMoment} from "../models/models";

export const useSortedMoments = (moments: IMoment[], sort: string) => {
    type OmitID = Omit<IMoment, "id"|"comments"|"created_date"|"author"|"url"|"is_liked"|"is_mine"|"likes">;
    type SortKey = keyof OmitID;
    return useMemo(() => {
        if (sort) {
            return [...moments].sort((a, b) =>
                a[sort as SortKey].localeCompare(b[sort as SortKey]))
        }
        return moments
    }, [sort, moments]);
}

export const useMoments = (moments: IMoment[], sort: string, query:string) => {
    const sortedMoments = useSortedMoments(moments, sort);
    return useMemo(() => {
        return sortedMoments?.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedMoments]);
}