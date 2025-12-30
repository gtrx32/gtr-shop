import { defineEventHandler, proxyRequest, getRouterParam } from 'h3'

export default defineEventHandler((event) => {
    const { backendUrl } = useRuntimeConfig()
    const path = getRouterParam(event, 'path') || ''
    return proxyRequest(event, `${backendUrl}/sanctum/${path}`)
})