export const getPageCount = (limit: number, totalElements: number) => {
    return Math.ceil(totalElements / limit)
}