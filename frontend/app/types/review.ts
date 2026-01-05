import type { User } from './user'

export type Review = {
    id: number
    title: string
    comment: string
    rating: number
    likes: number
    dislikes: number
    created_at: string
    user?: User
}
