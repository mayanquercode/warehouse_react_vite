import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import type { TileReport } from "../types"

type Props = {
    tile: TileReport
}

const ItemReport = ({ label, text, background }: { label: string, text?: string, background: string }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', background: background, padding: '1px 5px' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>
                {label}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 200, color: 'text.primary' }}>
                {text}
            </Typography>
        </Box>
    )
}

function CardHomeTileReport({ tile }: Props) {

    return (
        <Card key={tile.code} variant="outlined">
            <CardContent>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary' }}>{tile.code}</Typography>
                <Typography variant="body2" mb={1} sx={{ fontWeight: 400, color: 'text.primary' }}>{tile.name}</Typography>
                <Grid container spacing={2} mb={1}>
                    <Grid size={6}>
                        <Box borderRadius={2} overflow={'hidden'}>
                            <ItemReport label="DETALLE" background="#3f51b560" />
                            <ItemReport label="Roto" text={`${tile.brokenQuantity.toFixed(2)}m²`} background="#f5f5f580" />
                            <ItemReport label="Sistema" text={`${tile.stockQuantity.toFixed(2)}m²`} background="#f0f0f0" />
                            <ItemReport label="Faltante" text={`${tile.missingQuantity.toFixed(2)}m²`} background="#f5f5f580" />
                        </Box>
                    </Grid>
                    <Grid size={6}>
                        <Box borderRadius={2} overflow={'hidden'}>
                            <ItemReport label="REPORTE" background="#3f51b560" />
                            <ItemReport label="Caja" text={`${tile.areaPerBox.toFixed(2)}m²`} background="#f5f5f580" />
                            <ItemReport label="Pieza" text={`${tile.areaPerPiece.toFixed(2)}m²`} background="#f0f0f0" />
                            <ItemReport label="Cantidad" text={`${tile.piecesPerBox}`} background="#f5f5f580" />
                        </Box>
                    </Grid>
                </Grid>
                <Box borderRadius={2} overflow={'hidden'}>
                    <ItemReport label="OTROS" background="#3f51b560" />
                    <ItemReport label="Sobrante" text={`${tile.leftoverQuantity.toFixed(2)}m²`} background="#f5f5f580" />
                </Box>

            </CardContent>
        </Card>
    )
}

export default CardHomeTileReport