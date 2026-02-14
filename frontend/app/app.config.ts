export default defineAppConfig({
    ui: {
        button: {
            slots: {
                base: ['inline-flex items-center justify-center gap-1 font-normal rounded-xl cursor-pointer'],
                leadingIcon: ['mt-0.5'],
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
            ],
            defaultVariants: {
                color: 'primary',
                variant: 'ghost',
                size: 'xl'
            }
        },
        toast: {
            slots: {
                title: 'text-lg',
                description: 'text-base',
            },
        },
    }
})