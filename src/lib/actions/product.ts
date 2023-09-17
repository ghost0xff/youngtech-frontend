
export interface Product {
    id: number
    name: string,
    price: number,
    description: string,
    images: ProductImage[]
}

export interface ProductImage {
    id: number,
    main: boolean,
    originalName: string,
}


