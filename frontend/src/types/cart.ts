export interface CartItems {
    id: string,
    product: {
        id: string,
        name: string,
        originalPrice: number,
        discountPrice: number,
        image: string,
        category: string,
    }
    quantity: number,
    addedAt: string,
}