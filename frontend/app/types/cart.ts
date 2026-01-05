import type { Product } from './product'

export type CartItem = {
    quantity: number
    price: number
    total: number
    product: Product
}

export type Cart = {
    id: number
    total_quantity: number
    total_price: number
    products?: CartItem[]
}
