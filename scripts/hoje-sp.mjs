// Data de hoje em São Paulo (AAAA-MM-DD). Recusa datas futuras passadas como argumento.
export const hojeSP = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

export function dataPermitida(arg) {
  const hoje = hojeSP();
  if (!arg) return hoje;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(arg)) throw new Error(`Data inválida: ${arg} (use AAAA-MM-DD)`);
  if (arg > hoje) throw new Error(`Data futura não permitida: ${arg} (hoje é ${hoje})`);
  return arg;
}
