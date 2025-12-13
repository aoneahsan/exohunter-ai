import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  type User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  deleteUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, PROJECT_PREFIX } from '@/config/firebase';
import type { User } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<FirebaseUser>;
  signIn: (email: string, password: string) => Promise<FirebaseUser>;
  signInWithGoogle: () => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, `${PROJECT_PREFIX}users`, uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as User);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Create user profile in Firestore
  const createUserProfile = async (user: FirebaseUser, additionalData?: Partial<User>) => {
    const userRef = doc(db, `${PROJECT_PREFIX}users`, user.uid);
    
    const defaultUserData: User = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || additionalData?.displayName || 'Space Explorer',
      photoURL: user.photoURL || undefined,
      bio: '',
      joinedAt: serverTimestamp() as unknown as User['joinedAt'],
      stats: {
        detectionsCount: 0,
        accuracyScore: 0,
        contributionPoints: 0,
        rank: 'Novice Explorer',
      },
      preferences: {
        notifications: true,
        newsletter: true,
        publicProfile: true,
      },
      achievements: [],
      ...additionalData,
    };

    await setDoc(userRef, defaultUserData, { merge: true });
    setUserProfile(defaultUserData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, displayName: string): Promise<FirebaseUser> => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      await createUserProfile(user, { displayName });
      await sendEmailVerification(user);
      toast.success('Account created! Please verify your email.');
      return user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<FirebaseUser> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      return result.user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<FirebaseUser> => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      // Check if user profile exists
      const userDoc = await getDoc(doc(db, `${PROJECT_PREFIX}users`, user.uid));
      if (!userDoc.exists()) {
        await createUserProfile(user);
      }

      toast.success('Welcome to ExoHunter AI!');
      return user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, `${PROJECT_PREFIX}users`, currentUser.uid);
      await updateDoc(userRef, updates);

      if (updates.displayName || updates.photoURL) {
        await updateProfile(currentUser, {
          displayName: updates.displayName,
          photoURL: updates.photoURL,
        });
      }

      setUserProfile(prev => ({ ...prev!, ...updates }));
      toast.success('Profile updated successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (!currentUser) return;

    try {
      await sendEmailVerification(currentUser);
      toast.success('Verification email sent!');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  };

  const deleteAccount = async () => {
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    try {
      // Delete user profile from Firestore first
      const userRef = doc(db, `${PROJECT_PREFIX}users`, currentUser.uid);
      await deleteDoc(userRef);

      // Delete the Firebase Auth user
      await deleteUser(currentUser);

      // Clear local state
      setCurrentUser(null);
      setUserProfile(null);

      toast.success('Account deleted successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete account';
      toast.error(message);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    sendVerificationEmail,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};