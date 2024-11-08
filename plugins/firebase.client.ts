import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { firebaseConfig } = config.public;
  if (!firebaseConfig) return;

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return {
    provide: {
      fireAuth: auth,
    },
  };
});
