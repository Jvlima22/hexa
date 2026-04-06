import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, fullName } = req.body;

      if (!email || !password || !fullName) {
        return res.status(400).json({ error: 'Email, senha e nome são obrigatórios.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
      }

      const user = await authService.register(email, password, fullName);
      return res.status(201).json({
        message: 'Conta criada com sucesso. Verifique seu email.',
        userId: user?.id
      });
    } catch (error: any) {
      console.error('Register error:', error.message);
      return res.status(400).json({ error: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      const { user, session } = await authService.login(email, password);
      return res.status(200).json({
        user: {
          id: user?.id,
          email: user?.email,
          name: user?.user_metadata?.full_name
        },
        token: session?.access_token
      });
    } catch (error: any) {
      console.error('Login error:', error.message);
      return res.status(401).json({ error: 'Email ou senha inválidos.' });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido.' });
      }

      const token = authHeader.split(' ')[1]!;
      const user = await authService.getUser(token);

      return res.status(200).json({
        id: user?.id,
        email: user?.email,
        name: user?.user_metadata?.full_name
      });
    } catch (error: any) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  }
};
