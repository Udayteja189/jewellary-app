export interface WishlistItems {
    id: string,
    product: {
        id: string,
        name: string,
        originalPrice: number,
        discountPrice: number,
        image: string,
        category: string,
    }
    addedAt: string,
}

