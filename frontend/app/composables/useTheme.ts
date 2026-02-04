export function useTheme() {
    const colorMode = useColorMode()

    const theme = computed<'dark' | 'light'>(() => {
        const pref = colorMode.preference
        const current = pref === 'system' ? colorMode.value : pref
        return current === 'dark' ? 'dark' : 'light'
    })

    function toggle() {
        colorMode.preference = theme.value === 'dark' ? 'light' : 'dark'
    }

    return { theme, toggle }
}
