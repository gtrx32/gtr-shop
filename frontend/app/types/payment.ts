export type Payment = {
    id: number
    amount: number
    status: string
    paid_at: string | null
    transaction_code: string
    created_at: string
    updated_at: string
}
