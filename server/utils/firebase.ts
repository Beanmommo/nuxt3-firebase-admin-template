import {
  cert,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import serviceAccount from "./serviceAcountTest.json";
import { getAuth } from "firebase-admin/auth";

const config = useRuntimeConfig();
const { databaseURL } = config;

getApps().length === 0 &&
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    databaseURL: databaseURL,
  });

export const auth = getAuth();
