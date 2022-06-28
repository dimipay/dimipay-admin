import {
    NeoScheme,
    TableRecord,
} from "@/types"
import { useFormik } from "formik"
import { useEffect } from "react"

export const useLogic = (props: {
    scheme: NeoScheme
    data?: TableRecord
    onSubmit?(data: Partial<TableRecord>): void
}) => {
    const formik = useFormik<Partial<TableRecord>>({
        initialValues: props.data || {},
        validateOnChange: true,
        enableReinitialize: true,
        async validate(data) {
            const errors: Record<string, string> = {}

            for (const key in data) {
                if (!(key in props.scheme.fields)) continue
                const validater = props.scheme.fields[key].field.validate?.func

                if (validater) {
                    const error = await validater(data[key])
                    if (typeof error === "string") errors[key] = error
                }

                const yup = props.scheme.fields[key].field.validate?.yup
                if (yup) {
                    try {
                        await yup.validate(data[key])
                    } catch (e) {
                        if (e instanceof Error)
                            errors[key] = (e).message
                    }
                }
            }

            return errors
        },
        onSubmit: async (data) => {
            await props.onSubmit?.(data)
            return true
        }
    })

    useEffect(() => {
        console.log(
            "Form value updated!",
            formik.values
        )
    }, [
        formik.values
    ])

    return formik
}
