import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  User,
} from "firebase/auth";
import { auth } from "@/firebase.ts";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";

export type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setIsLoading(false);
      setUser(null);
      toast.success("Sign Out!");
    } catch (error) {
      toast.error(`Logout failed: ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {isLoading ? (
        <div className={"flex h-screen w-full items-center justify-center"}>
          <div className={"flex flex-col items-center gap-2 p-2"}>
            <ThemeLogo />
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
