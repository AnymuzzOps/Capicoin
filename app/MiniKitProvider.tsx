'use client'; // Asegúrate de que el código se ejecute del lado del cliente

import { ReactNode, useEffect } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

interface MiniKitProviderProps {
  children: ReactNode;
}

export default function MiniKitProvider({ children }: MiniKitProviderProps) {
  useEffect(() => {
    // Inicializa MiniKit con tu clave API
    MiniKit.install('crypto-key'); // Reemplaza con tu clave API real
  }, []);

  return <>{children}</>;
}
