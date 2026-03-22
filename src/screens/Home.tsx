import {
    Button,
    Container,
    Typography,
    Stack,
    Box,
    Paper,
    Avatar
} from '@mui/material';
import {
    AddBox as AddIcon,
    Inventory as KardexIcon,
    LocalShipping as DispatchIcon,
    Warehouse as WarehouseIcon
} from '@mui/icons-material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
    let navigate = useNavigate();

    useEffect(() => {
        const storage = localStorage.getItem('@products')
        if (!storage) {
            localStorage.setItem('@products', JSON.stringify([]))
        }
    }, [])

    // Configuración de los botones para mapearlos fácilmente
    const actions = [
        {
            label: 'Despachar',
            path: '/dispatch',
            icon: <DispatchIcon fontSize="large" />,
            color: '#3b82f6' // Blue
        },
        {
            label: 'Kardex',
            path: '/kardex',
            icon: <KardexIcon fontSize="large" />,
            color: '#8b5cf6' // Purple
        },
        {
            label: 'Nuevo Producto',
            path: '/create_product',
            icon: <AddIcon fontSize="large" />,
            color: '#10b981' // Green
        },
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f8fafc', // Fondo gris muy claro profesional
            pb: 4
        }}>
            {/* Header / Bienvenida */}
            <Box sx={{
                p: 4,
                bgcolor: 'white',
                borderBottom: '1px solid',
                borderColor: 'divider',
                mb: 3,
                textAlign: 'center'
            }}>
                <Avatar sx={{ m: '0 auto', bgcolor: 'primary.main', mb: 1 }}>
                    <WarehouseIcon />
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'text.primary' }}>
                    Bodega Quinindé
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Gestión de Inventario
                </Typography>
            </Box>

            <Container maxWidth="xs">
                <Stack spacing={2}>
                    {actions.map((action) => (
                        <Paper
                            key={action.path}
                            elevation={0}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 3,
                                overflow: 'hidden',
                                '&:active': { bgcolor: '#f1f5f9' } // Efecto táctil
                            }}
                        >
                            <Button
                                fullWidth
                                onClick={() => navigate(action.path)}
                                sx={{
                                    py: 3,
                                    px: 2,
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    textTransform: 'none',
                                    color: 'text.primary'
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 3,
                                    width: '100%'
                                }}>
                                    <Box sx={{
                                        color: action.color,
                                        display: 'flex',
                                        bgcolor: `${action.color}15`, // Fondo suave del mismo color
                                        p: 1.5,
                                        borderRadius: 2
                                    }}>
                                        {action.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {action.label}
                                    </Typography>
                                </Box>
                            </Button>
                        </Paper>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}