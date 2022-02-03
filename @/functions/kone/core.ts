export const kone =
    <koneFunc extends (...args: any) => any>(
        endpoint: string,
        method: "POST" | "GET"
    ) =>
    async (data: Parameters<koneFunc>[0]) => {
        return (
            await fetch(`/api/${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
        ).json() as Promise<ReturnType<koneFunc>>
    }
