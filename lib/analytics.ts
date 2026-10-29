// Medição sem vazar dados (docs/07): só `servico` e `origem`, nunca nome, empresa ou descrição.
type Gtag = (comando: "event", nome: string, parametros: Record<string, string>) => void;
type Fbq = (comando: "track", nome: string, parametros: Record<string, string>) => void;

export function registrarLead(servico: string, origem: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: Gtag; fbq?: Fbq };
  w.gtag?.("event", "generate_lead", { servico, origem });
  w.fbq?.("track", "Contact", { servico, origem });
}
