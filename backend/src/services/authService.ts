import { supabaseAdmin } from '../config/supabase';

export class AuthService {
  async register(email: string, password: string, fullName: string) {
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) throw new Error(error.message);
    return data.user;
  }

  async login(email: string, password: string) {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw new Error(error.message);
    return {
      user: data.user,
      session: data.session
    };
  }

  async getUser(token: string) {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error) throw new Error(error.message);
    return data.user;
  }
}

export const authService = new AuthService();
