import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged , signOut as firebaseSignOut} from 'firebase/auth'
import { auth } from "@/firebase.ts";
import { toast } from "sonner";

export type AuthContextType = {
  user: User | null
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = async () => {
    try {
      await firebaseSignOut(auth)
      setUser(null)
      setIsLoading(false)
      toast.success('Sign Out!')
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
      console.log(user);
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading,logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)