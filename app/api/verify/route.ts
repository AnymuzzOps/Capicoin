import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const proof = await request.json();

    // Enviar el proof a Worldcoin para verificarlo
    const response = await fetch("https://developer.worldcoin.org/api/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_id: "app_f11784605b81085628aa16e4687a008b",
        action: "verified-with-world-id",
        ...proof,
      }),
    });

    const result = await response.json();
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Verificación fallida" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error al verificar el proof:", error);
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
  }
}