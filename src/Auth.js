import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    // Set Firebase auth persistence to LOCAL
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setIsLoading(false);
        });
        return () => unsubscribe(); // Cleanup subscription on unmount
      })
      .catch((error) => {
        console.error('Error setting persistence:', error);
        setIsLoading(false); // Stop loading even on failure
      });
  }, [auth]);

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser(user); // Update local user state
      return { success: true, user };
    } catch (error) {
      console.error('Error during sign in:', error.message);
      return { success: false, error: error.message };
    }
  };

  // Function to sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};