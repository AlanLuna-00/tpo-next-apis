import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { CssBaseline, Box, Container } from '@mui/material';

export const metadata = {
  title: 'TPO APIS UADE',
  description: 'Frontend del TPO - APIS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="font-roboto antialiased">
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ py: 4 }}>
          <Container maxWidth="md">
            {children}
          </Container>
        </Box>
      </body>
    </html>
  );
}
