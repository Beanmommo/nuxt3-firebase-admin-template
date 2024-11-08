import { initializeApp, cert, getApp } from "firebase-admin/app";

/*
    Make sure initialise firebase app only once
*/
const createFirebaseApp = () => {
  const config = useRuntimeConfig();
  try {
    getApp();
  } catch {
    const firebaseConfig = {
      credential: cert({
        projectId: config.firebaseAdmin.projectId,
        clientEmail: config.firebaseAdmin.clientEmail,
        privateKey: config.firebaseAdmin.privateKey,
      }),
      databaseURL: config.firebaseAdmin.databaseURL,
    };
    return initializeApp(firebaseConfig);
  }
};

export default defineNuxtPlugin(() => {
  createFirebaseApp();
});
