import { CssBaseline, Box, Container } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../globals.css';

export const metadata = {
  title: 'Authentication Pages',
  description: 'Login and Registration Pages',
};

export default function AuthLayout({ children }) {
  return (
    <>
      <CssBaseline />
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="md">
            {children}
        </Container>
      </Box>
    </>
  );
}
