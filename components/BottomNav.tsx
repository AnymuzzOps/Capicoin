"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <ul>
        <li>
          <Link href="/">
            <button className={pathname === "/" ? "active" : ""}>Inicio</button>
          </Link>
        </li>
        <li>
          <Link href="/lobby">
            <button className={pathname === "/lobby" ? "active" : ""}>Lobby</button>
          </Link>
        </li>
        <li>
          <Link href="/ranking">
            <button className={pathname === "/ranking" ? "active" : ""}>Ranking</button>
          </Link>
        </li>
        <li>
          <Link href="/perfil">
            <button className={pathname === "/perfil" ? "active" : ""}>Perfil</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}