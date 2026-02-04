export default defineAppConfig({
    ui: {
        button: {
            slots: {
                base: ['inline-flex items-center justify-center gap-1 font-normal rounded-xl cursor-pointer'],
            },
            variants: {
                variant: {
                    ghost: 'border border-gtr-soft shadow-sm shadow-gtr-soft',
                    link: '!px-0 justify-start',
                },
            },
            compoundVariants: [
                {
                    variant: 'link',
                    size: 'md',
                    class: 'text-md py-0'
                }
            ]
        },
        input: {
            slots: {
                base: 'border border-muted !focus-visible:border-primary !focus-visible:ring-0',
            },
        },
        checkbox: {
            slots: {
                root: 'w-fit cursor-pointer',
                base: 'cursor-pointer',
                label: 'cursor-pointer',
            }
        }
    }
})
