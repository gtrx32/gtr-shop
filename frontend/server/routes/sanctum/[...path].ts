import {
    defineEventHandler,
    proxyRequest,
    getRouterParam,
    getRequestHeader,
} from 'h3'

export default defineEventHandler((event) => {
    const { backendUrl } = useRuntimeConfig()
    const path = getRouterParam(event, 'path') || ''
    const cookie = getRequestHeader(event, 'cookie')

    return proxyRequest(event, `${backendUrl}/sanctum/${path}`, {
        headers: cookie ? { cookie } : {},
    })
})
