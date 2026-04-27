import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  InputAdornment,
  Fade,
  Skeleton,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  Inventory as InventoryIcon,
  LocalShipping as TruckIcon,
  ReportProblem as WarningIcon,
  AccountCircle as UserIcon,
} from '@mui/icons-material';
import Header from "../components/Header";
import useQueryTileReport from '../hooks/tile-hooks';
import CardHomeTileReport from '../components/CardHomeTileReport';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router';



const KardexProduct = () => {

  const navigate = useNavigate();

  // hooks to use tanstack/react-query 
  const { data: tiles, isLoading } = useQueryTileReport()
  const session = useAppSelector(state => state.session)

  const [navValue, setNavValue] = useState(0);
  const [search, setSearch] = useState('');

  // Filtrado de datos por nombre de producto
  const filteredData = useMemo(() => {
    if (!tiles) return;


    return tiles.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, tiles]);



  // verifica session si no existe redirige a login
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session]);

  // navega entre rutas de navegacion 
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
  }


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

      {isLoading && (
        <>
          <Container sx={{ paddingTop: '10px' }}>
            <Skeleton variant='rectangular' width={'35%'} height={20} sx={{ marginBottom: '5px' }} />
            <Skeleton variant='rectangular' width={'100%'} height={20} sx={{ marginBottom: '5px' }} />
            <Grid container spacing={2} mb={1}>
              <Grid size={6}>
                <Box borderRadius={2} overflow={'hidden'}>
                  <Skeleton variant='rectangular' width={'100%'} height={100} />

                </Box>
              </Grid>
              <Grid size={6}>
                <Box borderRadius={2} overflow={'hidden'}>
                  <Skeleton variant='rectangular' width={'100%'} height={100} />
                </Box>
              </Grid>
            </Grid>
            <Box borderRadius={2} overflow={'hidden'}>
              <Skeleton variant='rectangular' width={'100%'} height={50} />
            </Box>
          </Container>
        </>
      )}

      <Fade in>
        <Box>
          {filteredData && (
            filteredData.map(item => (
              <CardHomeTileReport key={item.code} tile={item} />
            ))
          )}
        </Box>
      </Fade>



      {/* Navegación inferior persistente */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={10}>
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
    </Box>
  );
};

export default KardexProduct
