export interface Modal {
    content: string
    title: string
    button: {
        label: string
        action(): void
    }
}
