"use client";

import { type User } from "@supabase/supabase-js";
import { createContext, useContext, type PropsWithChildren } from "react";

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren<{ user: User | null }>;

/**
 * Supabase authentication provider.
 */
export function AuthProvider({ user, children }: AuthProviderProps) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useMustAuth() {
  const user = useAuth();

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  return user;
}
