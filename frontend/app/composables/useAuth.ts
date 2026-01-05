type Credentials = {
    email: string
    password: string
}

type RegisterData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export function useAuth() {
    const { apiFetch } = useApi()

    const user = useState<any | null>('auth-user', () => null)
    const loading = useState<boolean>('auth-loading', () => false)
    const error = useState<string | null>('auth-error', () => null)

    const isAuthenticated = computed(() => !!user.value)

    async function fetchUser() {
        if (user.value) return user.value

        try {
            user.value = await apiFetch('/api/user')
            return user.value
        } catch {
            user.value = null
            return null
        }
    }

    async function login(credentials: Credentials) {
        loading.value = true
        error.value = null

        try {
            await apiFetch('/sanctum/csrf-cookie')
            await apiFetch('/api/login', {
                method: 'POST',
                body: credentials,
            })

            user.value = null
            await fetchUser()
        } catch (e: any) {
            error.value = e?.data?.message || 'Login failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function register(data: RegisterData) {
        loading.value = true
        error.value = null

        try {
            await apiFetch('/sanctum/csrf-cookie')
            await apiFetch('/api/register', {
                method: 'POST',
                body: data,
            })
            user.value = null
            await fetchUser()
        } catch (e: any) {
            error.value = e?.data?.message || 'Register failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function logout() {
        await apiFetch('/api/logout', { method: 'POST' })
        user.value = null
        navigateTo('/login')
    }

    return {
        user,
        loading,
        error,
        isAuthenticated,
        fetchUser,
        login,
        register,
        logout,
    }
}