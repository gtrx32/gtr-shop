export type PaginatedResponse<T> = {
    data: T[]
    meta: PaginationMeta
}

export type PaginationMeta = {
    current_page: number
    last_page: number
    per_page: number
    total: number
    next_page_url: string | null
    prev_page_url: string | null
}

export type MessageResponse = {
    message: string
}

export type ErrorResponse = {
    status: number
    code?: string
    message?: string
    errors?: Record<string, string[]>
}