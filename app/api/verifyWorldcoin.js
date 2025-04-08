// pages/api/verifyWorldcoin.js

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { proof, apiKey } = req.body;
  
      // Verifica que la API Key sea correcta
      if (apiKey !== "crypto-key") {
        return res.status(401).json({ success: false, message: "API Key inválida" });
      }
  
      try {
        // Llama a la API de Worldcoin para verificar el proof
        const response = await fetch("https://api.worldcoin.org/v1/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            proof: proof,
            apiKey: "crypto-key", // Incluye la clave de la API aquí
          }),
        });
  
        const result = await response.json();
  
        if (result.success) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(400).json({ success: false, message: "Verificación fallida" });
        }
      } catch (error) {
        console.error("Error al verificar:", error);
        return res.status(500).json({ error: "Error interno" });
      }
    } else {
      res.status(405).json({ error: "Método no permitido" });
    }
  }
  