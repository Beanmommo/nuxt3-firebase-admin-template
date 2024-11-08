import {
  getIdToken,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import type { User } from "~/types/auth";
import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const { $fireAuth } = useNuxtApp();
  const authUser = useAuthUser();
  const cookie = ref();

  const setUser = (user: any) => {
    authUser.value = user as User;
  };

  const setCookie = (value: any) => {
    cookie.value = value;
  };

  // use for update user data
  // const setUserData = (data: any) => {
  //   authUser.value = {
  //     ...authUser.value,
  //     ...data,
  //   };
  // };

  type UserResponse = {
    user: User;
  };

  const me = async () => {
    if (!authUser.value) {
      try {
        const data: UserResponse = await $fetch("/api/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });
        setUser(data.user);
      } catch (error) {
        setCookie(null);
      }
    }
    return authUser;
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await setPersistence($fireAuth, inMemoryPersistence);
      const result = await signInWithEmailAndPassword(
        $fireAuth,
        email,
        password
      );

      const firebaseIdToken = await getIdToken(result.user);
      const data: UserResponse = await $fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ firebaseIdToken }),
      });
      setUser(data.user);
    } catch (error) {
      console.error(error);
      setCookie(null);
      setUser(null);
      return null;
    }

    return authUser;
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup($fireAuth, provider);
      const firebaseIdToken = await getIdToken(result.user);
      const data: UserResponse = await $fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ firebaseIdToken }),
      });
      setUser(data.user);
    } catch (error) {
      console.error(error);
      setCookie(null);
      setUser(null);
      return null;
    }
    return authUser;
  };

  const logout = async () => {
    const data: UserResponse = await $fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(data.user);
  };

  return {
    loginWithEmail,
    loginWithGoogle,
    logout,
    me,
  };
};
