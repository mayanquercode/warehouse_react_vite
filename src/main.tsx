import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import KardexProduct from "./screens/KardexProduct.tsx";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './screens/Login.tsx';
import { ProtectedRoute } from './layouts/ProtectedRoute.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename="/warehouse_react_vite">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <KardexProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/login"
            element={
              <Login />
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>

)
