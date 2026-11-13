const TOKEN_KEY = 'imagelite_token';

export class EmailJaCadastradoError extends Error {
  constructor() {
    super('Este e-mail já está cadastrado.');
    this.name = 'EmailJaCadastradoError';
  }
}

export class AuthService {
  baseURL: string = 'http://localhost:8080/users';

  async cadastrar(name: string, email: string, password: string): Promise<void> {
    const response = await this.post(this.baseURL, { name, email, password });

    if (response.status === 409) {
      throw new EmailJaCadastradoError();
    }
    if (!response.ok) {
      throw new Error('Não foi possível criar a conta.');
    }
  }

  async entrar(email: string, password: string): Promise<void> {
    const response = await this.post(`${this.baseURL}/auth`, { email, password });

    if (response.status === 401) {
      throw new Error('E-mail ou senha inválidos.');
    }
    if (!response.ok) {
      throw new Error('Não foi possível entrar.');
    }

    const data = await response.json();
    this.salvarToken(data.accessToken);
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  estaLogado(): boolean {
    return this.getToken() !== null;
  }

  sair(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      
    }
  }

  private salvarToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      
    }
  }

  private async post(url: string, body: unknown): Promise<Response> {
    try {
      return await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      throw new Error('Não foi possível conectar ao servidor.');
    }
  }
}

export const useAuthService = () => new AuthService();