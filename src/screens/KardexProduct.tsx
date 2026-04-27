import { useState, useMemo } from 'react';
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
import { supabase } from '../libs/supabase';
import { useAppSelector } from '../redux/hooks';



const KardexProduct = () => {
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



  // Cálculo de totales para la vista de resumen
  
  console.log('sesion',session);
  

  const onClickSession = async () => {
    const { error } = await supabase.auth.signOut()
    console.log('cerrar sesion');
    console.log(error);

  }

  return (
    <Box sx={{ pb: 12, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* AppBar / Encabezado principal */}
      <section className='p-4'>
        <button onClick={onClickSession}>Cerrar seccion</button>
      </section>
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
          onChange={(_event, newValue) => setNavValue(newValue)}
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
