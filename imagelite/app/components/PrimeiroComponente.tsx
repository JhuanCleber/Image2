'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PrimeiroComponenteProps {
  mensagem?: string;
  mensagemBotao?: string;
}

export const PrimeiroComponente = ({
  mensagem,
  mensagemBotao,
}: PrimeiroComponenteProps) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-green-950 text-white">
      {/* Blobs de fundo */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-yellow-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-green-500/30 blur-3xl" />

      <section className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Imagem em public/bolsonaro.webp */}
        <div className="mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-400/30">
          <Image
            src="/bolsonaro.webp"
            alt="Jair Bolsonaro"
            width={160}
            height={160}
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Jair{' '}
          <span className="bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent">
            Bolsonaro
          </span>
        </h1>

        <p className="mt-3 max-w-md text-lg font-semibold text-yellow-300">
          Brasil acima de tudo, Deus acima de todos
        </p>

        {mensagem && (
          <p className="mt-4 max-w-md text-white/70">{mensagem}</p>
        )}

        <Link
          href="/galeria"
          className="mt-8 rounded-xl bg-gradient-to-r from-green-500 to-yellow-400 px-8 py-3 text-sm font-semibold text-green-950 shadow-lg shadow-yellow-400/20 transition hover:scale-105"
        >
          {mensagemBotao || 'Acessar Galeria'}
        </Link>

        <p className="mt-10 text-xs text-white/40">ImageLite</p>
      </section>
    </main>
  );
};