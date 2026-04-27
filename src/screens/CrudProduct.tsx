import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Modal,
    TextField,
    Typography,
    List,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";

import {
    Inventory as InventoryIcon,
    LocalShipping as TruckIcon,
    ReportProblem as WarningIcon,
    AccountCircle as UserIcon,
    Add,
} from '@mui/icons-material';

import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../libs/supabase";
import CardProductItem from "../components/CardProductItem";

// Interfaz para el producto
interface Product {
    name: string;
    code: string;
    category: string;
    product_type: string;
}


// Funciones de supabase para traer y crear productos 

// leer categorias

const readCategories = async () => {
    const { data, error } = await supabase
        .from('categories')
        .select('id, name');
    if (error) {
        console.error('Error al leer categorias:', error);
    }
    return data;
}

// leer los products
const readProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('name, code, category, product_type');
    if (error) {
        console.error('Error al leer products:', error);
    }
    return data;
}

// crear productos
const createProduct = async (product: Product) => {
    const { data, error } = await supabase
        .from('products')
        .insert([product]);
    if (error) {
        console.error('Error al crear producto:', error);
    }
    return data;
}


function CrudProduct() {

    const [navValue, setNavValue] = useState(0);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    // inputs
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [category, setCategory] = useState('');
    const [productType, setProductType] = useState('');

    useEffect(() => {
        readCategories().then((data) => setCategories(data as { id: string, name: string }[]));
    }, []);

    useEffect(() => {
        readProducts().then((data) => setProducts(data as Product[]));
    }, []);

    const handleNavigation = (value: number) => {
        setNavValue(value);
        switch (value) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/bodega');
                break;
            case 2:
                navigate('/crud-product');
                break;
            case 3:
                navigate('/perfil');
                break;
        }
    };

    const handleSave = () => {
        console.log({ name, code, category, productType });

        const newProduct: Product = {
            name,
            code,
            category,
            product_type: productType
        };

        createProduct(newProduct);
        const updateProducts = async () => {
            const data = await readProducts();
            setProducts(data as Product[]);
        };

        updateProducts();


        // reset (opcional)
        setName('');
        setCode('');
        setCategory('');
        setProductType('');

        setOpenDialog(false);
    };

    return (
        <Box sx={{ pb: 12, bgcolor: '#f8fafc', minHeight: '100vh' }}>

            <Header />
            <Divider />

            {/* Botón */}
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                sx={{ m: 2 }}
            >
                Crear Producto
            </Button>

            {/* Bottom nav */}
            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000
                }}
                elevation={10}
            >
                <BottomNavigation
                    showLabels
                    value={navValue}
                    onChange={(_event, newValue) => handleNavigation(newValue)}
                    sx={{ height: 70 }}
                >
                    <BottomNavigationAction label="GUÍA" icon={<InventoryIcon />} />
                    <BottomNavigationAction label="BODEGA" icon={<TruckIcon />} />
                    <BottomNavigationAction label="PRODUCTOS" icon={<WarningIcon />} />
                    <BottomNavigationAction label="PERFIL" icon={<UserIcon />} />
                </BottomNavigation>
            </Paper>

            <List>
                {products.map((product) => (
                    <CardProductItem key={product.code} product={product} />
                ))}
            </List>

            {/* MODAL FULLSCREEN */}
            <Modal open={openDialog} onClose={() => setOpenDialog(false)}>

                <Box
                    sx={{
                        width: '100vw',
                        height: '100vh',
                        bgcolor: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >

                    {/* HEADER */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            borderBottom: '1px solid #e5e7eb',
                            bgcolor: 'white'
                        }}
                    >
                        <Typography variant="h6">
                            Nuevo Producto
                        </Typography>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setOpenDialog(false)}
                        >
                            Cerrar
                        </Button>
                    </Box>

                    {/* FORM */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2
                        }}
                    >
                        <Container maxWidth="sm">

                            <TextField
                                label="Nombre del producto"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                                label="Código del producto"
                                fullWidth
                                margin="normal"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-label">Categoría del Producto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Categoría del Producto"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mt: 3 }}>
                                <InputLabel id="demo-simple-select-label">Tipo de Producto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productType}
                                    label="Tipo de Producto"
                                    onChange={(e) => setProductType(e.target.value)}
                                >
                                    <MenuItem value="AREA">Area (M²)</MenuItem>
                                    <MenuItem value="UNIT">Uni (Unidad)</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3 }}
                                onClick={handleSave}
                            >
                                Guardar Producto
                            </Button>

                        </Container>
                    </Box>

                </Box>

            </Modal>

        </Box>
    );
}

export default CrudProduct;