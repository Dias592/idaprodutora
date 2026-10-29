// Placeholder da fase 0. A home completa entra na fase 2 (prompts/fase-2-home-e-servicos-p1.md).
import { home } from "@/lib/content";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-4">
      <h1 className="text-4xl font-bold">{home.h1}</h1>
      <p className="mt-4 text-muted">Site em construção.</p>
    </main>
  );
}
