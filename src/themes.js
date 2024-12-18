import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
    },
  },
  palette: {
    primary: {
      main: '#FDD94E', //p1
      contrastText: '#3B3B3B', //text
    },
    p3: {
      main: '#FFE78B',
    },
    p4: {
      main: '#FFFBED',
      contrastText: '#3B3B3B', //text
    },
    secondary: {
      main: '#9747FF', //purple (p2)
    },
    n1: {
      main: '#0B0928',
    },
    n2: {
      main: '#B8B8B8',
    },
    n3: {
      main: '#DCDBDC',
      contrastText: '#B8B8B8',
    },
    n4: {
      main: '#EDEDED',
    },
    text: {
      main: '#3B3B3B',
    },
    white: {
      main: '#FFFFFF',
    },
    delete: {
      main: '#FF7D7D', //red2
      light: '#FFAC8F', //coral
      contrastText: 'white',
    },
  },
  typography: {
    allVariants: {
      color: '#3B3B3B', // Default color for all typography variants
    },
    fontFamily: `'Noto Sans KR', sans-serif`,
  },
});
