import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aquata - Game",
  description: "- Game",
};

export default function GameLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/game/build">Schiffe</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}
