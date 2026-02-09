export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuth()
    await auth.loadUser()

    if (auth.isAuth.value) {
        return navigateTo('/profile')
    }
})