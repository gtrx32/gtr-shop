export type ApiListResponse<T> = {
    data: T[]
}

export type ApiItemResponse<T> = {
    data: T
}

export type ApiPaginatedResponse<T> = {
    data: T[]
    meta: ApiPaginationMeta
}

export type ApiPaginationMeta = {
    current_page: number
    last_page: number
    per_page: number
    total: number
    next_page_url: string | null
    prev_page_url: string | null
}

export type ApiError = {
    status: number
    code?: string
    message?: string
    errors?: Record<string, string[]>
}