import { useState } from "react";
import type { ChangeEvent } from "react";
import {
    Box, Button, Container, FormControl,
    IconButton, InputLabel, MenuItem, Select, TextField, Toolbar, Typography,
    type SelectChangeEvent,

} from "@mui/material";
import { Settings, ArrowBack } from '@mui/icons-material';
import BoxGrid from "./BoxGrid";

const CATEGORIES_UNIT = ['PLANCHAS', 'ESPEJOS'];
const CATEGORIES_AREA = ['CERAMICA DE PISO', 'CERAMICA DE PARED', 'PORCELANATO'];
const CATEGORIES = [...CATEGORIES_AREA, ...CATEGORIES_UNIT];

// Interfaces más claras
interface Area {
    box: string;
    piece: string;
    quantity: string;
}

interface FormInputs {
    code: string;
    name: string;
    category: string;
    unitType: 'UNIT' | 'AREA';
    area: Area | null;
}

function ScreenCreateProduct() {
    const [formData, setFormData] = useState<FormInputs>({
        code: '',
        name: '',
        category: '',
        unitType: 'UNIT',
        area: null
    });

    const [showAreaFields, setShowAreaFields] = useState(false);


    const handleReset = () => {
        setFormData({ code: '', name: '', category: '', unitType: 'UNIT', area: null });
        setShowAreaFields(false);
    };

    // Manejador genérico para inputs simples
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;

        if (name === "category") {
            const isNewValueArea = CATEGORIES_AREA.includes(value);
            const wasPreviouslyArea = CATEGORIES_AREA.includes(formData.category);

            // Solo reseteamos el objeto 'area' si cambiamos de TIPO de categoría
            // (Ej: de PLANCHAS a PORCELANATO)
            // Si cambia de CERAMICA a PORCELANATO, conservamos lo escrito.
            const shouldResetArea = isNewValueArea !== wasPreviouslyArea;

            setShowAreaFields(isNewValueArea);

            setFormData(prev => ({
                ...prev,
                [name]: value,
                unitType: isNewValueArea ? 'AREA' : 'UNIT',
                area: shouldResetArea
                    ? (isNewValueArea ? { box: '', piece: '', quantity: '' } : null)
                    : prev.area // <--- Aquí mantenemos los datos anteriores si ya era área
            }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Manejador para campos anidados de Area
    const handleAreaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            area: prev.area ? { ...prev.area, [name]: value } : null
        }));
    };

    const handleSubmitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { code, name, category, unitType } = formData

        if (code.trim() === '' || name.trim() === '' || category.trim() === '' || unitType.trim() === '') {
            return
        }



        const storage = localStorage.getItem('@products')

        if (!storage) {
            localStorage.setItem('@products', JSON.stringify([formData]))
            handleReset()
            return
        }

        const payload = JSON.parse(storage)

        payload.push(formData)
        localStorage.setItem('@products', JSON.stringify(payload))

        handleReset()
    };

    return (
        <>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size="large" color="inherit">
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        Crear Producto
                    </Typography>
                </Box>
                <IconButton size="large"><Settings /></IconButton>
            </Toolbar>

            <Box component="form" onSubmit={handleSubmitForm} noValidate>
                <Container>
                    <Box mb={3}>
                        <TextField
                            name="code"
                            fullWidth
                            label="Código"
                            value={formData.code}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box mb={3}>
                        <TextField
                            name="name"
                            fullWidth
                            label="Nombre del Producto"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box mb={3}>
                        <FormControl fullWidth>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                label="Categoría"
                                onChange={handleChange}
                            >
                                {CATEGORIES.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    {showAreaFields && (
                        <Box mb={3}>
                            <BoxGrid sizeContainer={12} sizeItem={4} spacingContainer={2}>
                                <TextField
                                    name="box"
                                    label="Caja m²"
                                    type="number"
                                    value={formData.area?.box}
                                    onChange={handleAreaChange}
                                />
                                <TextField
                                    name="piece"
                                    label="Pieza m²"
                                    type="number"
                                    value={formData.area?.piece}
                                    onChange={handleAreaChange}
                                />
                                <TextField
                                    name="quantity"
                                    label="Cantidad"
                                    type="number"
                                    value={formData.area?.quantity}
                                    onChange={handleAreaChange}
                                />
                            </BoxGrid>
                        </Box>
                    )}

                    <BoxGrid sizeItem={8} sizeContainer={12}>
                        <Button variant="outlined" fullWidth onClick={handleReset}>Limpiar</Button>
                        <Button type="submit" variant="contained" color="success" fullWidth>Guardar</Button>
                    </BoxGrid>

                </Container>
            </Box>
        </>
    );
}

export default ScreenCreateProduct