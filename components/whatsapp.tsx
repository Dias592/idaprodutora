"use client";
// Conversão pelo WhatsApp (docs/07-conversao-whatsapp.md): FormularioWhatsApp, CtaWhatsApp, BotaoWhatsAppFlutuante.
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { IconeWhatsApp, cx } from "@/components/ui";
import { registrarLead } from "@/lib/analytics";
import {
  SERVICOS_FORMULARIO,
  linkWhatsApp,
  mensagemArtigo,
  mensagemFlutuante,
  mensagemOrcamento,
  tituloDaPagina,
  type Origem,
} from "@/lib/whatsapp";

const LIMITE_DESCRICAO = 300;

const campo =
  "min-h-12 w-full rounded-ida border border-surface bg-surface px-3.5 text-[15px] text-text placeholder:text-muted/60 aria-[invalid=true]:border-accent";

type Erros = Partial<Record<"nome" | "servico" | "descricao", string>>;

export function FormularioWhatsApp({
  servico = "",
  origem = "home",
  pagina,
}: {
  /** Serviço pré-selecionado (valor de SERVICOS_FORMULARIO). */
  servico?: string;
  origem?: Origem;
  /** Título da página, usado em "(enviado pela página ...)". Se omitido, usa o título do documento. */
  pagina?: string;
}) {
  const id = useId();
  const [descricao, setDescricao] = useState("");
  const [erros, setErros] = useState<Erros>({});

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const valor = (k: string) => String(f.get(k) ?? "").trim();

    const novos: Erros = {};
    if (!valor("nome")) novos.nome = "Informe seu nome.";
    if (!valor("servico")) novos.servico = "Escolha o tipo de serviço.";
    if (!valor("descricao")) novos.descricao = "Conte em poucas linhas sobre o projeto.";
    setErros(novos);
    if (Object.keys(novos).length) {
      const primeiro = Object.keys(novos)[0];
      (e.currentTarget.elements.namedItem(primeiro) as HTMLElement | null)?.focus();
      return;
    }

    const mensagem = mensagemOrcamento({
      nome: valor("nome"),
      empresa: valor("empresa"),
      servico: valor("servico"),
      data: valor("data"),
      local: valor("local"),
      descricao: valor("descricao"),
      pagina: pagina ?? tituloDaPagina(),
    });
    registrarLead(valor("servico"), origem);
    window.open(linkWhatsApp(mensagem), "_blank", "noopener");
  }

  const erro = (k: keyof Erros) =>
    erros[k] ? (
      <span id={`${id}-${k}-erro`} className="text-[13px] font-medium text-accent" role="alert">
        {erros[k]}
      </span>
    ) : null;
  const ariaErro = (k: keyof Erros) =>
    erros[k] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${k}-erro` } : {};

  return (
    <form
      onSubmit={enviar}
      noValidate
      aria-label="Pedido de orçamento"
      className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-5 rounded-ida bg-bg p-6 sm:p-10"
    >
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Nome *
        <input name="nome" type="text" autoComplete="name" required className={campo} {...ariaErro("nome")} />
        {erro("nome")}
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Empresa
        <input name="empresa" type="text" autoComplete="organization" className={campo} />
      </label>
      <label className="col-span-full flex flex-col gap-2 text-sm font-semibold">
        Tipo de serviço *
        <select name="servico" defaultValue={servico} required className={campo} {...ariaErro("servico")}>
          <option value="">Selecione</option>
          {SERVICOS_FORMULARIO.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {erro("servico")}
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Data do evento ou gravação
        <input name="data" type="date" className={cx(campo, "[color-scheme:dark]")} />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold">
        Local / cidade
        <input name="local" type="text" autoComplete="address-level2" className={campo} />
      </label>
      <label className="col-span-full flex flex-col gap-2 text-sm font-semibold">
        Breve descrição *
        <textarea
          name="descricao"
          rows={4}
          maxLength={LIMITE_DESCRICAO}
          required
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className={cx(campo, "resize-y py-3 leading-normal")}
          {...ariaErro("descricao")}
          aria-describedby={[erros.descricao && `${id}-descricao-erro`, `${id}-contador`].filter(Boolean).join(" ")}
        />
        <span className="flex justify-between gap-4">
          {erro("descricao") ?? <span />}
          <span id={`${id}-contador`} className="text-xs font-normal text-muted" aria-live="polite">
            {descricao.length}/{LIMITE_DESCRICAO}
          </span>
        </span>
      </label>
      <div className="col-span-full flex flex-col gap-3">
        <button
          type="submit"
          className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-ida bg-accent px-7 text-base font-bold text-accent-contrast transition hover:brightness-110"
        >
          <IconeWhatsApp />
          Enviar pelo WhatsApp
        </button>
        <p className="m-0 text-xs leading-normal text-muted">
          Ao enviar, você abre uma conversa com a IDA no WhatsApp. Usamos seus dados só para responder ao orçamento.{" "}
          <Link href="/politica-de-privacidade" className="text-accent underline underline-offset-2 hover:text-text">
            Política de privacidade
          </Link>
        </p>
      </div>
    </form>
  );
}

/** Bloco de CTA dentro de artigos: <CtaWhatsApp servico="..." />. */
export function CtaWhatsApp({
  servico,
  origem = "blog",
  tituloArtigo,
  texto = "Fale direto com a equipe que vai produzir. A conversa abre no WhatsApp, sem cadastro.",
}: {
  servico: string;
  origem?: Origem;
  tituloArtigo?: string;
  texto?: string;
}) {
  const montar = () => linkWhatsApp(mensagemArtigo(tituloArtigo ?? tituloDaPagina(), servico.toLowerCase()));
  return (
    <aside className="not-prose my-10 flex flex-col gap-4 rounded-ida border border-surface bg-surface p-7 sm:p-9">
      <p className="m-0 text-[22px] leading-tight font-bold">Quer {servico.toLowerCase()} para a sua empresa?</p>
      <p className="m-0 text-base leading-relaxed text-muted">{texto}</p>
      <a
        href={montar()}
        onClick={(e) => {
          e.currentTarget.href = montar();
          registrarLead(servico, origem);
        }}
        target="_blank"
        rel="noopener"
        className="inline-flex min-h-[52px] items-center justify-center gap-2.5 self-start rounded-ida bg-accent px-7 text-[15px] font-bold text-accent-contrast no-underline transition hover:brightness-110"
      >
        <IconeWhatsApp />
        Pedir orçamento pelo WhatsApp
      </a>
    </aside>
  );
}

/** Botão flutuante: abre o WhatsApp com "Vim pela página {título}". */
export function BotaoWhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp(mensagemFlutuante("do site"))}
      onClick={(e) => {
        e.currentTarget.href = linkWhatsApp(mensagemFlutuante(tituloDaPagina()));
        registrarLead("Geral", "flutuante");
      }}
      target="_blank"
      rel="noopener"
      aria-label="Falar com a IDA no WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-[60px] items-center justify-center rounded-full bg-accent text-accent-contrast shadow-lg transition hover:brightness-110 sm:right-6 sm:bottom-6"
    >
      <IconeWhatsApp tamanho={28} />
    </a>
  );
}
