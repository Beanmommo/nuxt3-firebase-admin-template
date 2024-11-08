import type { User } from "../types/auth";

export const useAuthUser = () => {
  return useState<User | null>("user", () => null);
};
