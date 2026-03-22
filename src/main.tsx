import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from './screens/Home.tsx';
import DispatchTile from './screens/DispatchTile.tsx';
import KardexProduct from "./screens/KardexProduct.tsx";
import ScreenCreateProduct from './inventory/presentation/screens/ScreenCreateProduct.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/warehouse_react_vite">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dispatch" element={<DispatchTile />} />
      <Route path="/kardex" element={<KardexProduct />} />
      <Route path="/create_product" element={<ScreenCreateProduct />} />
    </Routes>
  </BrowserRouter>,
)
