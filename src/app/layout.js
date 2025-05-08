import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';
import Providers from '@/app/providers';

export const metadata = {
  title: 'TPO APIS UADE',
  description: 'Frontend del TPO - APIS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-roboto antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
