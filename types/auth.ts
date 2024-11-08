import { UserRecord } from "firebase-admin/auth";

export interface User extends UserRecord {
  email: string;
  username?: string;
  accessToken: string;
}
