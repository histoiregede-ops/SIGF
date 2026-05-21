export class DataPaginator {
    private static instance: DataPaginator

    constructor() {
    }

    public static getInstance(): DataPaginator {
        if (!DataPaginator.instance) {
            DataPaginator.instance = new DataPaginator()
        }
        return DataPaginator.instance
    }

    public test(): void {
        console.log('test')
    }

    public getPagination(page: number, size: number): PaginationData {
        const limit = size ? +size : 10
        const offset = page ? page * limit : 0

        return { limit, offset }
    }

    public getPagingData<T>(data: T[], count: number, page: number, limit: number): PagingData<T> {
        const currentPage = page ? page : 0
        const totalPages = Math.ceil(count / limit)

        return {
            totalItems: count,
            data: data,
            totalPages: totalPages,
            currentPage: currentPage,
            paginationSize: limit,
        }
    }

}

export interface PaginationData {
    limit: number,
    offset: number,
}

export interface PagingData<T> {
    totalItems: number,
    data: T[],
    totalPages: number,
    currentPage: number,
    paginationSize: number,
}