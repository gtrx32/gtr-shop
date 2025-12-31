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
    const user = useState<any | null>('auth-user', () => null)
    const loading = useState<boolean>('auth-loading', () => false)
    const error = useState<string | null>('auth-error', () => null)

    function ssrHeaders() {
        return import.meta.server
            ? useRequestHeaders(['cookie', 'origin', 'referer'])
            : undefined
    }

    function xsrfHeader() {
        if (import.meta.server) return {}

        const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)

        if (!match?.[1]) return {}

        return {
            'X-XSRF-TOKEN': decodeURIComponent(match[1]),
        }
    }


    async function authFetch<T>(url: string, options: any = {}) {
        return $fetch<T>(url, {
            credentials: 'include',
            ...options,
            headers: {
                ...ssrHeaders(),
                ...xsrfHeader(),
                ...options.headers,
            },
        })
    }

    async function fetchUser() {
        if (user.value) return user.value

        try {
            user.value = await authFetch('/api/user')
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
            await authFetch('/sanctum/csrf-cookie')
            await authFetch('/api/login', {
                method: 'POST',
                body: credentials,
            })
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
            await authFetch('/sanctum/csrf-cookie')
            await authFetch('/api/register', {
                method: 'POST',
                body: data,
            })
            await fetchUser()
        } catch (e: any) {
            error.value = e?.data?.message || 'Register failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function logout() {
        await authFetch('/api/logout', { method: 'POST' })
        user.value = null
        navigateTo('/login')
    }

    const isAuthenticated = computed(() => !!user.value)

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
