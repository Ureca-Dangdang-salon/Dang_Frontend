import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from '@/themes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={mainTheme}>
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>
);
