export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.backendUrl,
        credentials: 'include',

        onRequest({options}) {
            const headers = new Headers(options.headers || {})
            headers.set('accept', 'application/json')

            if (import.meta.server) {
                const request = nuxtApp.ssrContext?.event.node.req
                const requestHeaders = request?.headers || {}

                if (requestHeaders.cookie) headers.set('cookie', requestHeaders.cookie)
                if (requestHeaders.referer) headers.set('referer', requestHeaders.referer)

                if (requestHeaders.origin) {
                    headers.set('origin', requestHeaders.origin)
                } else if (requestHeaders.referer && requestHeaders.referer.startsWith('http')) {
                    headers.set('origin', new URL(requestHeaders.referer).origin)
                } else {
                    const proto = requestHeaders['x-forwarded-proto'] || 'http'
                    const host = requestHeaders['x-forwarded-host'] || requestHeaders.host
                    if (host) headers.set('origin', `${proto}://${host}`)
                }

                const cookie = requestHeaders.cookie || ''
                const xsrf = cookie
                    .split('; ')
                    .find(c => c.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1]

                if (xsrf) headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrf))
            }

            if (import.meta.client) {
                const token = useCookie('XSRF-TOKEN').value
                if (token) headers.set('X-XSRF-TOKEN', decodeURIComponent(token))
            }

            options.headers = headers
        }
    })

    nuxtApp.provide('api', api)
})