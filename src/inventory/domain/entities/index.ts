export interface Product {
    code: string
    name: string
    category: string
    unitType: string
    area: Area | null
}

export interface Area {
    box: number
    piece: number
    quantity: number
}

