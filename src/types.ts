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