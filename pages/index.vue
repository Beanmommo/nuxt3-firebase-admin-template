<script setup lang="ts">
const { loginWithEmail, loginWithGoogle } = useAuth();

const email = ref<string>('');
const password = ref<string>('');

async function clickHandlerLogin() {
    const user = await loginWithEmail(email.value, password.value);
    if (user) navigateTo('/home');
}

async function clickHandlerGoogleLogin() {
    const user = await loginWithGoogle();
    if (user) navigateTo('/home');
}
</script>

<template>
    <div class="form">
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="password" label="Password" type="password" />
        <v-btn @click="clickHandlerLogin">Log in</v-btn>
        <v-btn @click="clickHandlerGoogleLogin">Google Sign-In</v-btn>
    </div>
</template>

<style scoped lang="scss">
.form {
    background-color: $primary;
}
</style>