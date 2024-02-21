import { Marvel } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const marvel = Marvel({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1F3255',
            contrastText: '#242526',
        },
        background: {
            default: '#FFF',
        },
    },
    typography: {
        fontFamily: marvel.style.fontFamily,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                'html, body': {
                    minHeight: '100vh',
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: '#1F3255',
                    color: '#FFF',
                },
            },
        },
    },
});

export default defaultTheme;
