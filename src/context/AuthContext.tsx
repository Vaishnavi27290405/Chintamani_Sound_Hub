import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  authRedirectAction?: () => void;
  openAuthModal: (mode?: 'login' | 'register', onSuccess?: () => void) => void;
  closeAuthModal: () => void;
  login: (email: string, phoneOrPassword?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, city: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const STORAGE_KEY = 'chintamani_sound_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse auth user from storage', e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [pendingCallback, setPendingCallback] = useState<(() => void) | undefined>(undefined);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const openAuthModal = (mode: 'login' | 'register' = 'login', onSuccess?: () => void) => {
    setAuthModalMode(mode);
    setPendingCallback(() => onSuccess);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(undefined);
  };

  const login = async (email: string, phoneOrPassword?: string): Promise<boolean> => {
    // Check if we have registered user in local storage or create a login session
    const existingUsersRaw = localStorage.getItem('chintamani_registered_users');
    let existingUsers: User[] = [];
    if (existingUsersRaw) {
      try {
        existingUsers = JSON.parse(existingUsersRaw);
      } catch (e) {}
    }

    const matched = existingUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.phone === phoneOrPassword
    );

    if (matched) {
      setUser(matched);
    } else {
      // Create session for the user
      const newUser: User = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0].replace('.', ' ').toUpperCase() || 'Valued Customer',
        email: email,
        phone: phoneOrPassword || '+91 98220 54321',
        city: 'Pune / Mumbai',
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      existingUsers.push(newUser);
      localStorage.setItem('chintamani_registered_users', JSON.stringify(existingUsers));
    }

    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(undefined);
    }
    return true;
  };

  const register = async (name: string, email: string, phone: string, city: string): Promise<boolean> => {
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Maharashtra',
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);

    // Save to registered pool
    try {
      const existingUsersRaw = localStorage.getItem('chintamani_registered_users');
      const existingUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
      const filtered = existingUsers.filter((u) => u.email.toLowerCase() !== email.toLowerCase());
      filtered.push(newUser);
      localStorage.setItem('chintamani_registered_users', JSON.stringify(filtered));
    } catch (e) {}

    setIsAuthModalOpen(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(undefined);
    }
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
