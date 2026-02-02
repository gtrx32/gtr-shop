export default defineNuxtPlugin(() => {
    const w = window as any
    if (w.__themeHotkeyInstalled) return
    w.__themeHotkeyInstalled = true

    const colorMode = useColorMode()

    const toggle = () => {
        const current = (colorMode.preference === 'system' ? colorMode.value : colorMode.preference)
        colorMode.preference = current === 'dark' ? 'light' : 'dark'
    }

    const onKeydown = (e: KeyboardEvent) => {
        if (e.repeat) return

        if (e.code === 'Backslash') {
            e.preventDefault()
            toggle()
        }
    }

    window.addEventListener('keydown', onKeydown, { passive: false })
})