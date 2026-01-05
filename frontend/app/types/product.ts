import type { Review } from './review'

export type Product = {
    id: number
    name: string
    slug: string
    description: string
    price: number
    stock: number
    image: string | null

    reviews_count?: number
    rating?: number
    reviews?: Review[]
}
