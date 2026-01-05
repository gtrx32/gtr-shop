import type { Product } from './product'

export type Banner = {
    id: number
    title: string
    subtitle: string
    image: string | null
    url: string
    target_url: string
    sort: number
    clicks: number
    text_color: string
    product?: Product
}
