import { auth } from "~/server/utils/firebase";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { authCookieExpires, authCookieName } = config.public;
  const { firebaseIdToken } = await readBody(event);
  try {
    const sessionCookie = await auth.createSessionCookie(firebaseIdToken, {
      expiresIn: authCookieExpires as number,
    });
    setCookie(event, authCookieName as string, sessionCookie, {
      maxAge: authCookieExpires as number,
      sameSite: "strict",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    const token = await auth.verifySessionCookie(sessionCookie, true);

    const user = await auth.getUser(token.uid);
    return { user };
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 401,
      message: "Not authenticated",
    });
  }
});
