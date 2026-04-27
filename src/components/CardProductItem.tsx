import { Card, CardContent, Typography } from "@mui/material";
import type { Product } from "../types";

function CardProductItem({ product }: { product: Product }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>{product.code}</Typography>
                <Typography variant="body2" mb={1} sx={{ fontWeight: 400, color: 'text.primary' }}>{product.name}</Typography>
            </CardContent>
        </Card>
    )
}

export default CardProductItem;
