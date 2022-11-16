import {useMemo} from 'react'
import {IMoment} from "../components/App/Moment/Moment";

export const useSortedMoments = (moments: IMoment[], sort: string) => {
    type OmitID = Omit<IMoment, "id">;
    type SortKey = keyof OmitID;
    const sortedMoments = useMemo(() => {
        if (sort) {
            return [...moments].sort((a, b) =>
                a[sort as SortKey].localeCompare(b[sort as SortKey]) )
        }
        return moments
    }, [sort, moments])
    return sortedMoments;
}

export const useMoments = (moments: IMoment[], sort: string, query:string) => {
    const sortedMoments = useSortedMoments(moments, sort);
    const sortedAndSearchedMoments = useMemo(()=> {
        return sortedMoments.filter(post => post.title.toLowerCase().includes(query))
    }, [query, sortedMoments])
    return sortedAndSearchedMoments;
}