export function useApi() {
    const config = useRuntimeConfig()

    function ssrHeaders() {
        if (!import.meta.server) return undefined

        const h = useRequestHeaders(['cookie', 'origin', 'referer'])
        const appUrl = config.public.appUrl

        return {
            ...h,
            origin: h.origin ?? appUrl,
            referer: h.referer ?? appUrl,
            accept: 'application/json',
        }
    }

    function xsrfHeader() {
        if (import.meta.server) return {}
        const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
        if (!match?.[1]) return {}
        return { 'X-XSRF-TOKEN': decodeURIComponent(match[1]) }
    }

    async function apiFetch<T>(url: string, options: any = {}) {
        return $fetch<T>(url, {
            baseURL: config.public.backendUrl,
            credentials: 'include',
            ...options,
            headers: {
                ...ssrHeaders(),
                ...xsrfHeader(),
                ...options.headers,
            },
        })
    }

    return { apiFetch }
}