import type { Product } from './product'
import type { Payment } from './payment'
import type { Delivery } from './delivery'

export type OrderItem = {
    quantity: number
    price: number
    total: number
    product: Product
}

export type Order = {
    id: number
    total_price: number
    total_quantity: number
    status: string
    comment: string | null
    created_at: string
    updated_at: string

    payment?: Payment
    delivery?: Delivery
    products?: OrderItem[]
}
