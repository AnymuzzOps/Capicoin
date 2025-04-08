import './globals.css';
import { ReactNode } from 'react';
import BottomNav from '../components/BottomNav';

export const metadata = {
  title: 'Capicoin',
  description: 'Tu mini app capibara sobre World App',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className="app-wrapper">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}