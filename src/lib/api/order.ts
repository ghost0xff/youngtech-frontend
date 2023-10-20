'use server'

import { CartItem } from "./cart"

export interface Order {
    id: number,
    total: number,
    subtotal: number,
    ivaPercentage: number,
    isDelivered: number,
    isCanceled: number,
    orderDate: string,
    deliveryFrom: string,
    deliveryTo: string,
    items: CartItem[]
}