export type Delivery = {
    id: number
    status: string
    tracking_code: string
    shipped_at: string | null
    delivered_at: string | null
    created_at: string
    updated_at: string
}
