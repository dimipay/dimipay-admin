export const clickWithSpace = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== " " && e.key !== "Enter") return

    e.preventDefault()
    e.currentTarget.click()
}
