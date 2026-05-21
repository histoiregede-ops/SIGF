export interface PagingData<T> {
    totalItems: number,
    data: T[],
    totalPages: number,
    currentPage: number,
    paginationSize?: number,
}