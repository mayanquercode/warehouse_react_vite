export interface TileReport {
    code: string;
    name: string;
    category: string;
    areaPerBox: number;
    areaPerPiece: number;
    piecesPerBox: number;
    stockQuantity: number;
    brokenQuantity: number;
    missingQuantity: number;
    leftoverQuantity: number;
}

export interface Product {
    name: string;
    code: string;
    category: string;
    product_type: string;
}

export interface Category {
    id: string;
    name: string;
}