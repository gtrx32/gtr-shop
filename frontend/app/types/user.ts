import type { Review } from './review'
import type { Cart } from './cart'
import type { Order } from './order'

export type User = {
    id: number
    name: string
    email: string
    avatar: string | null

    reviews?: Review[]
    cart?: Cart
    orders?: Order[]
}
