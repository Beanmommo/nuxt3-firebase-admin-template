import type { H3Event } from "h3";
import { getAuth } from "firebase-admin/auth";

async function getUserFromCookie(cookie: string) {
  try {
    const token = await getAuth().verifySessionCookie(cookie, true);
    const user = await getAuth().getUser(token.uid);
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserFromSession(event: H3Event) {
  const config = useRuntimeConfig();
  const { authCookieName } = config.public;

  const cookie = getCookie(event, authCookieName as string);
  if (!cookie) return null;
  const user = await getUserFromCookie(cookie);
  return user;
}
