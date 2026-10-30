// Perfis oficiais da IDA nas redes. Perfil null = oculto em todo o site (rodapé, contato, schema sameAs, llms.txt).
// O Instagram @idaprodutora ainda não foi criado: quando existir, troque null por { usuario, url }.
export type Perfil = { usuario: string; url: string };

export const INSTAGRAM = null as Perfil | null; // ex.: { usuario: "@idaprodutora", url: "https://instagram.com/idaprodutora" }

export const perfisAtivos = (): string[] => [INSTAGRAM?.url].filter((u): u is string => !!u);
