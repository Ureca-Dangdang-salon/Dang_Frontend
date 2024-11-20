import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { mainTheme } from '@/themes';
import { Navbar } from '@components/Common/Navbar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={mainTheme}>
      <Box
        width="500px"
        m="auto"
        height="100vh"
        borderLeft={1}
        borderRight={1}
        borderColor="n4.main"
      >
        <AppRoutes />
        <Navbar />
      </Box>
    </ThemeProvider>
  </StrictMode>
);
