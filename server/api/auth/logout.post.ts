export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { authCookieName } = config.public;
  deleteCookie(event, authCookieName as string, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return {
    user: null,
  };
});
