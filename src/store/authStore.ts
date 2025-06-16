import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, User } from "../types/AuthInterface";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoggedIn: false,

      // Sync methods only - React Query handles async
      login: (user: User) => set({ 
        user, 
        isAuthenticated: true, 
        isLoggedIn: true 
      }),

      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        isLoggedIn: false 
      }),

      updateUser: (userData: Partial<User>) => set((state) => ({ 
        user: state.user ? { ...state.user, ...userData } : null
      })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
