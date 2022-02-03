export const assert = (
    name: string,
    content: string,
    isServersideOnly: boolean
) => {
    if (!content && !isServersideOnly)
        throw new Error(`Cannot find "${name}" in environment variables`)
    return content
}

export const JWT_SECRET = assert("JWT_SECRET", process.env.JWT_SECRET, true)
