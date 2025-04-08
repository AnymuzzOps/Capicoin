"use client"; // Asegúrate de que este código se ejecute en el cliente

import { useState } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

export default function LobbyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/nonce'); // Obtener el nonce del backend
      const { nonce } = await res.json();

      // Realizar la autenticación de la billetera con el nonce
      const { commandPayload, finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        requestId: '0', // Opcional
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: 'Esta es mi declaración. Aquí está el enlace https://worldcoin.com/apps',
      });

      // Verificar si la autenticación fue exitosa
      if (finalPayload.status === 'success') {
        setWalletAddress(finalPayload.address);
        alert('Billetera conectada correctamente');
      } else {
        throw new Error('Error al autenticar la billetera');
      }
    } catch (err) {
      setError('Error al conectar la billetera.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Conectar billetera</h1>
      {walletAddress ? (
        <p>Billetera conectada: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet} disabled={loading}>
          {loading ? 'Conectando billetera...' : 'Conectar Billetera'}
        </button>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
