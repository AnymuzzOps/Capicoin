"use client"; // Asegúrate de que el código se ejecute del lado del cliente

import { useState } from 'react';  // Para el manejo de estados
import * as MiniKit from '@worldcoin/minikit-js'; // Importa todo el SDK de Worldcoin

// Asegúrate de que estás exportando un componente React
export default function LobbyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Inicializa el SDK con tu clave API
  const worldcoin = new MiniKit.MiniKit({
    apiKey: 'Crypto-key',  // Reemplaza con tu clave API real
  });

  const handleBuySubscription = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await worldcoin.purchaseSubscription({
        amount: 1.00, // 1 WLD para la compra
        duration: 30, // Duración de la suscripción (30 días)
        actionId: 'capicoin', // Action_ID de Worldcoin
      });

      if (response.success) {
        alert('¡Suscripción adquirida con éxito!');
      } else {
        throw new Error(response.message || 'Hubo un error al realizar la compra.');
      }
    } catch (err) {
      setError('Error al procesar la compra. Intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg text-[#5C1E3E]">
      {/* Título */}
      <section className="mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span role="img" aria-label="medal">🏅</span> Membresía Premium
        </h2>
        <p className="text-sm text-gray-600">
          Mejora tu experiencia en AXOLOCOIN con beneficios exclusivos
        </p>
        <div className="mt-2 text-lg font-semibold">
          Precio: <span className="text-black">1.00 WLD</span>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mb-6 border rounded-lg p-4 bg-[#FFF0F5]">
        <h3 className="font-semibold mb-2">Beneficios:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>✅ 3x recompensas diarias de tokens</li>
          <li>✅ Nuevos tokens exclusivos</li>
          <li>✅ 30 días de estado premium</li>
          <li>✅ Insignia exclusiva de premium</li>
        </ul>
      </section>

      {/* Estado Premium */}
      <section className="border rounded-lg p-4 bg-[#FFF0F5]">
        <h3 className="font-semibold mb-2">Estado Premium</h3>
        <p className="text-sm mb-4">
          ¡Suscríbete a premium para obtener 3 veces más recompensas diarias y beneficios exclusivos!
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleBuySubscription}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
        >
          {loading ? 'Procesando...' : 'Suscribirse por 1.00 WLD'}
        </button>
      </section>

      {/* Action_ID */}
      <section className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Action_ID de Worldcoin: <strong>capicoin</strong>
        </p>
      </section>
    </main>
  );
}
