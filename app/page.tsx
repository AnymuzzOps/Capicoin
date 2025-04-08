"use client";

import { useState, useEffect } from "react";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";

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

  const onSuccess = () => {
    setIsVerified(true);
  };

  const handleVerify = async (proof: ISuccessResult): Promise<void> => {
    try {
      console.log("Proof recibido:", proof);
      // Enviar el proof al backend para verificarlo con la API de Worldcoin
      const response = await fetch("/api/verifyWorldcoin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proof, apiKey: "crypto-key" }), // Asegúrate de enviar la API Key
      });

      const result = await response.json();
      if (result.success) {
        setIsVerified(true);
      } else {
        alert("Verificación fallida");
      }
    } catch (error) {
      console.error("Error al verificar el proof:", error);
      alert("Error en la verificación");
    }
  };

  return (
    <main className="container">
      <h1>Capicoin 1</h1>
      <p>Relájate como una capibara</p>

      {!isVerified && (
        <div className="card">
          <h3>Verificación con World ID</h3>
          <IDKitWidget
            app_id="app_f11784605b81085628aa16e4687a008b"
            action="verified-with-world-id" // Acción anónima
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Orb}
          >
            {({ open }) => (
              <button onClick={open}>Verificar con World ID</button>
            )}
          </IDKitWidget>
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
