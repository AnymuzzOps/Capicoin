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
      // Enviar el proof al backend para verificarlo
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error("Verificación fallida");
      }
      // No retornamos nada (void), ya que onSuccess se encargará de actualizar el estado
    } catch (error) {
      console.error("Error al verificar el proof:", error);
      throw error; // Lanzamos el error para que IDKitWidget lo maneje
    }
  };

  return (
    <main className="container">
      <h1>Capicoin</h1>
      <p>Relájate como una capibara</p>

      <div className="card">
        <h2>Balance</h2>
        <p>
          <strong>1.00 $CAPI</strong>
        </p>
        <p>Próximo reclamo disponible en:</p>
        <div id="timer">{formatTime(timeLeft)}</div>
        <button
          onClick={() => {
            if (!isVerified) {
              alert("¡Por favor, verifica tu identidad con World ID primero!");
            } else {
              alert("¡Tokens reclamados exitosamente!");
            }
          }}
          disabled={timeLeft > 0 || !isVerified}
          style={{ opacity: timeLeft > 0 || !isVerified ? 0.5 : 1 }}
        >
          Reclamar Tokens
        </button>
      </div>

      <div className="card" id="world-id-container">
        <h3>Verificación con World ID</h3>
        {isVerified ? (
          <p>✅ Identidad verificada exitosamente</p>
        ) : (
          <IDKitWidget
            app_id="app_f11784605b81085628aa16e4687a008b"
            action="verified-with-world-id"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            verification_level={VerificationLevel.Orb}
          >
            {({ open }) => (
              <button onClick={open}>Verificar con World ID</button>
            )}
          </IDKitWidget>
        )}
      </div>

      <div className="card">
        <h3>Tabla de Clasificación</h3>
        <ol>
          <li>
            <strong>capiking</strong> — 1,500,000.00 $CAPI
          </li>
          <li>
            <strong>capilover</strong> — 1,250,000.00 $CAPI
          </li>
          <li>
            <strong>relaxcapi</strong> — 1,000,000.00 $CAPI
          </li>
        </ol>
      </div>
    </main>
  );
}