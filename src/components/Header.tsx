import { Avatar, Box, Chip, Toolbar, Typography } from "@mui/material";
import { LocationOn as MapIcon } from '@mui/icons-material';

export default function Header() {
    return (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold', width: 36, height: 36 }}>C</Avatar>
                <Box>
                    <Typography variant="subtitle2" component="h1" sx={{ color: 'text.primary', fontWeight: 900, lineHeight: 1.2, fontSize: '0.8rem' }}>
                        LA CASA DE LA CERÁMICA
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.65rem' }}>
                        BODEGA MATRIZ
                    </Typography>
                </Box>
            </Box>
            <Chip
                icon={<MapIcon sx={{ fontSize: '14px !important' }} />}
                label="Quininde"
                size="small"
                color="success"
                variant="outlined"
                sx={{ fontWeight: 'bold', fontSize: '10px' }}
            />
        </Toolbar>

    )
}
