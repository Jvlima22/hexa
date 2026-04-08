"use client";
// Auth Context Provider using Supabase Auth v2

import { supabase } from "lib/supabase";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Busca a sessão atual com maior prioridade para OAuth
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      console.log("Auth State Initialized:", session?.user ? "Logged In" : "Logged Out");
    };

    getInitialSession();

    // Escuta mudanças de auth (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event, session?.user ? "User detected" : "No user");
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
