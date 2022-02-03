import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const Redirector: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.push(`/`)
    }, [router])

    return <></>
}
