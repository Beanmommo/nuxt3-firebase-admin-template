export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuthUser();
  console.log(user.value?.email);
  const allowedRoutes = ["/"];
  if (user.value) {
    if (allowedRoutes.includes(to.path)) {
      console.log("navigate to /home");
      return navigateTo("/home");
    }
  } else {
    if (!allowedRoutes.includes(to.path)) {
      console.log("navigate to /");
      return navigateTo("/");
    }
  }
});
