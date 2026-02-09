export const useAuth = () => {
    const api = useApi()

    const user = useState<User | null>('auth:user', () => null)
    const loaded = useState<boolean>('auth:loaded', () => false)
    const isAuth = computed(() => !!user.value)

    const actionPending = useState<boolean>('auth:actionPending', () => false)
    const userPending = useState<boolean>('auth:userPending', () => false)

    const error = useState<string | null>('auth:error', () => null)

    const ensureCsrf = async () => {
        const token = useCookie('XSRF-TOKEN').value
        if (token) return
        await api('/sanctum/csrf-cookie', { method: 'GET' })
    }

    const fetchUser = async (options: { force?: boolean } = {}) => {
        const force = options.force ?? false

        if (userPending.value) return user.value
        if (!force && loaded.value) return user.value

        userPending.value = true

        try {
            user.value = await api<User>('/api/user', { method: 'GET' })
        } catch {
            user.value = null
        } finally {
            loaded.value = true
            userPending.value = false
        }

        return user.value
    }

    const loadUser = () => fetchUser()

    const refreshUser = () => fetchUser({ force: true })

    const login = async (payload: LoginPayload) => {
        if (actionPending.value) return

        actionPending.value = true
        error.value = null

        try {
            await ensureCsrf()
            await api('/api/login', { method: 'POST', body: payload })
            await refreshUser()

            const toast = useToast()
            toast.add({
                title: 'Вход выполнен успешно',
                description: `Добро пожаловать, ${user.value?.name ?? ''}`,
                color: 'success',
            })

            const route = useRoute()
            await navigateTo((route.query.redirect as string) || '/')
        } catch (e: ApiError) {
            const err = e

            if (err.status === 401) {
                error.value = 'Неверный email или пароль.'
            } else if (err.status === 422) {
                error.value = 'Некорректно заполнена форма.'
            } else {
                error.value = 'Не удалось выполнить вход.'
            }
        } finally {
            actionPending.value = false
        }
    }

    const register = async (payload: RegisterPayload) => {
        if (actionPending.value) return

        actionPending.value = true
        error.value = null

        try {
            await ensureCsrf()
            await api('/api/register', { method: 'POST', body: payload })
            await refreshUser()

            const toast = useToast()
            toast.add({
                title: 'Регистрация выполнена успешно',
                description: `Добро пожаловать, ${user.value?.name ?? ''}`,
                color: 'success',
            })

            const route = useRoute()
            await navigateTo((route.query.redirect as string) || '/')
        } catch (e: ApiError) {
            const err = e

            if (err.status === 422) {
                error.value = 'Некорректно заполнена форма.'
            } else {
                error.value = 'Не удалось выполнить регистрацию.'
            }
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

            await navigateTo('/login')
        } catch (e: ApiError) {
            error.value = 'Не удалось выйти из системы.'
        } finally {
            actionPending.value = false
        }
    }

    return {
        user,
        isAuth,
        actionPending,
        userPending,
        error,
        loadUser,
        refreshUser,
        login,
        register,
        logout,
    }
}