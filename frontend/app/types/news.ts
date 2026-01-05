export type News = {
    id: number
    title: string
    slug: string
    excerpt: string
    content?: string
    image: string | null
    active_from: string | null
    created_at: string | null
    updated_at: string | null
}
