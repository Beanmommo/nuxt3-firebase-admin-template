<script setup lang="ts">
const { logout } = useAuth();
async function clickHandlerLogout() {
    await logout();
    navigateTo('/');
}
</script>

<template>
    <v-btn @click="clickHandlerLogout">
        Logout
    </v-btn>
</template>