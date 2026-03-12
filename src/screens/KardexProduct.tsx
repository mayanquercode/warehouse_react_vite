import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  InputAdornment,
  Fade
} from '@mui/material';
import {
  Search as SearchIcon,
  Inventory as InventoryIcon,
  LocalShipping as TruckIcon,
  ReportProblem as WarningIcon,
  AccountCircle as UserIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Header from "../components/Header";
import { databaseProducts } from "../data/products"


const GUIA_DATA = [
  {
    id: 'CERAPISOCOMA173',
    cantidad: 48,
    producto: "CERAMICA DE PISO GALAXY 57X57 CJ 2.30",
    factor: "2.36",
    medida: "58x58",
    metros: 111.36
  },
  { id: 2, cantidad: 48, producto: "3843", factor: "2.36", medida: "58x58", metros: 111.36 },
  { id: 3, cantidad: 24, producto: "7793", factor: "2.36", medida: "58x58", metros: 55.68 },
  { id: 4, cantidad: 24, producto: "7746", factor: "2.36", medida: "58x58", metros: 55.68 },
  { id: 5, cantidad: 48, producto: "1780", factor: "2.36", medida: "58x58", metros: 111.36 },
  { id: 6, cantidad: 24, producto: "3841", factor: "2.36", medida: "58x58", metros: 55.68 },
  { id: 7, cantidad: 35, producto: "1861", factor: "2.36", medida: "58x58", metros: 82.60 },
  { id: 8, cantidad: 48, producto: "5793", factor: "2.36", medida: "58x58", metros: 111.36 },
  { id: 9, cantidad: 24, producto: "1753", factor: "2.36", medida: "58x58", metros: 55.68 },
  { id: 10, cantidad: 31, producto: "Allegro", factor: "2.50", medida: "50x50", metros: 77.50 },
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderBottom: '1px solid #f0f0f0',

}));

const KardexProduct = () => {
  const [navValue, setNavValue] = useState(0);
  const [search, setSearch] = useState('');

  // Filtrado de datos por nombre de producto
  const filteredData = useMemo(() => {
    return databaseProducts.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Cálculo de totales para la vista de resumen

  return (
    <Box sx={{ pb: 12, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* AppBar / Encabezado principal */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #eee' }}>
        <Header />
        <Box>
          <Container>
            <TextField
              fullWidth
              placeholder="Buscar por modelo..."
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </Box>
      </AppBar>

      <Fade in>
        <Box>
          {filteredData.map((item) => (
            <StyledCard key={item.code} variant="outlined">

              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 400, color: 'text.primary' }}>{item.name}</Typography>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>
                    Stock:
                  </Typography>

                  <Typography variant="caption" sx={{ fontWeight: 200, color: 'text.primary' }}>
                    {item.stock}m²
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          ))}
        </Box>
      </Fade>

      {/* Navegación inferior persistente */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={10}>
        <BottomNavigation
          showLabels
          value={navValue}
          onChange={(event, newValue) => setNavValue(newValue)}
          sx={{ height: 70 }}
        >
          <BottomNavigationAction label="GUÍA" icon={<InventoryIcon />} />
          <BottomNavigationAction label="BODEGA" icon={<TruckIcon />} />
          <BottomNavigationAction label="MERMA" icon={<WarningIcon />} />
          <BottomNavigationAction label="PERFIL" icon={<UserIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default KardexProduct
