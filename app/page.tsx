// Placeholder até a fase 2 (prompts/fase-2-home-e-servicos-p1.md). Componentes em /styleguide.
import { Container } from "@/components/ui";
import { home } from "@/lib/content";

export default function Home() {
  return (
    <Container className="flex min-h-[60dvh] flex-col justify-center py-24">
      <h1 className="text-4xl font-bold">{home.h1}</h1>
      <p className="mt-4 text-muted">Site em construção.</p>
    </Container>
  );
}
