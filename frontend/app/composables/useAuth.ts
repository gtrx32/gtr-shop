export const useAuth = () => {
    const api = useApi()

    const user = useState<any | null>('auth:user', () => null)
    const loaded = useState<boolean>('auth:loaded', () => false)
    const isAuth = computed(() => !!user.value)

    const actionPending = useState<boolean>('auth:actionPending', () => false)
    const userPending = useState<boolean>('auth:userPending', () => false)
    const pending = computed(() => actionPending.value || userPending.value)

    const error = useState<string | null>('auth:error', () => null)

    const ensureCsrf = async () => {
        const token = useCookie('XSRF-TOKEN').value
        if (token) return
        await api('/sanctum/csrf-cookie', { method: 'GET' })
    }

    const fetchUser = async ({ force = false } = {}) => {
        if (userPending.value) return user.value
        if (!force && loaded.value) return user.value

        userPending.value = true
        error.value = null

        try {
            user.value = await api('/api/user', { method: 'GET' })
        } catch (e: any) {
            user.value = null
            error.value = e?.data?.message || e?.message || 'Request failed'
        } finally {
            loaded.value = true
            userPending.value = false
        }

        return user.value
    }

    const loadUser = () => fetchUser()

    const refreshUser = () => fetchUser({ force: true })

    const login = async (payload: any) => {
        if (actionPending.value) return

        actionPending.value = true
        error.value = null

        try {
            await ensureCsrf()
            await api('/api/login', { method: 'POST', body: payload })
            await refreshUser()
        } catch (e: any) {
            error.value = e?.data?.message || e?.message || 'Login failed'
        } finally {
            actionPending.value = false
        }
    }

    const register = async (payload: any) => {
        if (actionPending.value) return

        actionPending.value = true
        error.value = null

        try {
            await ensureCsrf()
            await api('/api/register', { method: 'POST', body: payload })
            await refreshUser()
        } catch (e: any) {
            error.value = e?.data?.message || e?.message || 'Register failed'
        } finally {
            actionPending.value = false
        }
    }

    const logout = async () => {
        if (actionPending.value) return

        actionPending.value = true
        error.value = null

        try {
            await ensureCsrf()
            await api('/api/logout', { method: 'POST' })
            user.value = null
            loaded.value = true
        } catch (e: any) {
            error.value = e?.data?.message || e?.message || 'Logout failed'
        } finally {
            actionPending.value = false
        }
    }

    return {
        user,
        isAuth,
        actionPending,
        userPending,
        pending,
        error,
        loadUser,
        refreshUser,
        login,
        register,
        logout,
    }
}