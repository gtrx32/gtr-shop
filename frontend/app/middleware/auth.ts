export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuth()
    await auth.loadUser()

    if (!auth.isAuth.value) {
        return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
})