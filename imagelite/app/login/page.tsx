'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Template } from '../components';
import { EmailJaCadastradoError, useAuthService } from '../resource/auth';

export default function LoginPage() {
  const auth = useAuthService();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (password !== repeatPassword) {
      setError('As senhas não conferem.');
      return;
    }

    setIsLoading(true);
    try {
      try {
        await auth.cadastrar(name.trim(), email.trim(), password);
      } catch (cause) {
        
        if (!(cause instanceof EmailJaCadastradoError)) {
          throw cause;
        }
      }
      await auth.entrar(email.trim(), password);
      router.push('/galeria');
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'Algo deu errado. Tente de novo.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Template>
      <main className="mx-auto flex max-w-md flex-col px-4 py-10 text-white">
        <div className="rounded-xl border border-yellow-400/30 bg-green-900/40 p-6 shadow-lg shadow-yellow-400/10">
          <h1 className="mb-6 text-center text-2xl font-bold text-yellow-300">
            Login to your account
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
            />

            <Input
              label="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              autoComplete="new-password"
              required
            />

            {error && (
              <p
                className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-red-300"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Aguarde...' : 'Login'}
            </Button>
          </form>
        </div>
      </main>
    </Template>
  );
}