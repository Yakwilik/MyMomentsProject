import {useMemo} from "react";


export const usePagination = (totalPages: number) => {
    return useMemo(()=> {
        let result: Array<number> = []
        for (let i = 0; i < totalPages; i++) {
            result.push(i + 1)
        }
        return result
    }, [totalPages])
}