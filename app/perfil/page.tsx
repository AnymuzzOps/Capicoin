"use client";


export default function PerfilPage() {
    return (
      <main className="container">
        <h1>Perfil</h1>
        <p>Balance: 1.00 $CAPI</p>
        <p>Usuario: capibara123</p>
        <button onClick={() => alert("¡Editar perfil!")}>
          Editar perfil
        </button>
      </main>
    );
  }