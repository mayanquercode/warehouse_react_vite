import { useQuery } from "@tanstack/react-query";
import { supabase } from "../libs/supabase";
import type { TileReport } from "../types";


async function getTileReport(): Promise<TileReport[]> {
    try {
        const { data, error } = await supabase.from('tile_report').select('*')

        if (error) { return [] }
        if (!data) { return [] }

        return data.map(item => {
            return {
                code: item.code,
                name: item.name,
                category: item.category,
                areaPerBox: item.area_per_box,
                areaPerPiece: item.area_per_piece,
                piecesPerBox: item.pieces_per_box,
                stockQuantity: item.stock_quantity,
                brokenQuantity: item.broken_quantity,
                missingQuantity: item.missing_quantity,
                leftoverQuantity: item.leftover_quantity,
            }
        })




    } catch (error) {
        return []
    }
}

export default function useQueryTileReport() {
    return useQuery({
        queryKey: ['tiles'],
        queryFn: getTileReport
    })
}