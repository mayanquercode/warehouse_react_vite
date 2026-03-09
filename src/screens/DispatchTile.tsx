import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router';
import { Divider } from '@mui/material';
import { useState } from 'react';

export default function DispatchTile() {
    let navigate = useNavigate();

    // Estado para los valores de los inputs
    const [areaBox, setAreaBox] = useState('');
    const [areaPiece, setAreaPiece] = useState('');
    const [areaDispatch, setAreaDispatch] = useState('');

    // Estado para los resultados
    const [cajas, setCajas] = useState(0);
    const [piezas, setPiezas] = useState(0);
    const [metrosEntregados, setMetrosEntregados] = useState(0);
    const [metrosSobrantes, setMetrosSobrantes] = useState(0);

    const handleDispatch = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Convertir los valores a números
        const boxValue = parseFloat(areaBox) || 0;
        const pieceValue = parseFloat(areaPiece) || 0;
        const dispatchValue = parseFloat(areaDispatch) || 0;

        // Aquí puedes realizar los cálculos necesarios
        if (boxValue > 0 && pieceValue > 0) {
            // Ejemplo de cálculo (ajusta según tu lógica de negocio)
            const calculatedCajas = Math.floor(dispatchValue / boxValue);

            const remainingAfterBoxes = dispatchValue - (calculatedCajas * boxValue);

            const calculatedPiezas = Math.floor(remainingAfterBoxes / pieceValue);

            const calculatedMetrosEntregados = (calculatedCajas * boxValue) + (calculatedPiezas * pieceValue);

            const calculatedMetrosSobrantes = dispatchValue - calculatedMetrosEntregados;

            setCajas(calculatedCajas);
            setPiezas(calculatedPiezas);
            setMetrosEntregados(calculatedMetrosEntregados);
            setMetrosSobrantes(calculatedMetrosSobrantes);
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 2 }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton
                            onClick={() => navigate('/')}
                            edge="start"
                            color="inherit"
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                            Despachar Baldosa
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <form onSubmit={handleDispatch}>
                        <Box mb={2}>
                            <Box mb={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TextField
                                    type='number'
                                    name='areaBox'
                                    label="m² por Caja"
                                    fullWidth
                                    variant="outlined"
                                    value={areaBox}
                                    onChange={(e) => setAreaBox(e.target.value)}
                                    inputProps={{ step: "0.01", min: "0" }}
                                />
                                <TextField
                                    type='number'
                                    name='areaPiece'
                                    label="m² por Pieza"
                                    fullWidth
                                    variant="outlined"
                                    value={areaPiece}
                                    onChange={(e) => setAreaPiece(e.target.value)}
                                    inputProps={{ step: "0.01", min: "0" }}
                                />
                            </Box>
                            <TextField
                                type='number'
                                name='areaDispatch'
                                label="Cantidad a despachar (m²)"
                                fullWidth
                                variant="outlined"
                                value={areaDispatch}
                                onChange={(e) => setAreaDispatch(e.target.value)}
                                inputProps={{ step: "0.01", min: "0" }}
                            />
                        </Box>

                        <Box mb={2}>
                            <Button variant="contained" type='submit' fullWidth>Calcular</Button>
                        </Box>
                    </form>

                    {/* Contadores principales */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        mb: 2
                    }}>
                        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                CAJAS
                            </Typography>
                            <Typography variant="h3" color="primary" fontWeight="500">
                                {cajas}
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                PIEZAS
                            </Typography>
                            <Typography variant="h3" color="primary" fontWeight="500">
                                {piezas}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Metros */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Metros entregados:
                            </Typography>
                            <Typography variant="body1" color="primary" fontWeight="500">
                                {metrosEntregados.toFixed(2)} m²
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Metros sobrantes:
                            </Typography>
                            <Typography variant="body1" color="warning.main" fontWeight="500">
                                {metrosSobrantes.toFixed(2)} m²
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}