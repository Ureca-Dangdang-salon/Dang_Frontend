import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  palette: {
    primary: {
      //yellow palettes
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
      //gray button
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
    },
  },
});
