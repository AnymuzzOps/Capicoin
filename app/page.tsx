"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60 - 1); // 23:59:59 en segundos
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 24 * 60 * 60 - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    try {
      // Inicia el proceso de verificación mediante el comando
      const response = await fetch("https://api.worldcoin.org/v1/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Aquí debes incluir los parámetros según la API de Worldcoin
          // Ejemplo: código de usuario, id, etc.
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsVerified(true);
      } else {
        alert("Verificación fallida");
      }
    } catch (error) {
      console.error("Error al verificar:", error);
    }
  };

  return (
    <main className="container">
      <h1>Capicoin</h1>
      <p>Relájate como una capibara</p>

      {!isVerified && (
        <div className="card">
          <h3>Verificación con World ID</h3>
          <button onClick={handleVerify}>
            Verificar con World ID
          </button>
        </div>
      )}

      {isVerified && (
        <>
          <div className="card">
            <h2>Balance</h2>
            <p>
              <strong>1.00 $CAPI</strong>
            </p>
            <p>Próximo reclamo disponible en:</p>
            <div id="timer">{formatTime(timeLeft)}</div>
            <button
              onClick={() => {
                alert("¡Tokens reclamados exitosamente!");
              }}
              disabled={timeLeft > 0}
              style={{ opacity: timeLeft > 0 ? 0.5 : 1 }}
            >
              Reclamar Tokens
            </button>
          </div>
        </>
      )}
    </main>
  );
}
