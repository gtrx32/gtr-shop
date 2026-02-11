export default function (
    value: string | Date,
    options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    },
    locale = 'ru-RU'
): string {
    const date = typeof value === 'string' ? new Date(value) : value

    if (Number.isNaN(date.getTime())) return ''

    return new Intl.DateTimeFormat(locale, options).format(date)
}