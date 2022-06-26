import { Input, Button, InlineForm } from "@/components"
import { PanelComponent } from "@/types"
import { PageHeader, Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import bcrypt from "bcryptjs"
import { table } from "@/functions"
import { toast } from "react-toastify"
import { useFormik } from "formik"

interface FormContent {
    hashedPassword: string
}

export const ResetPassword: PanelComponent = (props) => {
    const { handleSubmit, handleBlur, handleChange } = useFormik<FormContent>({
        initialValues: {
            hashedPassword: "",
        },
        onSubmit: async (content) => {
            const res = await table.adminAccount.PATCH({
                id: props.record.id,
                data: {
                    hashedPassword: content.hashedPassword,
                },
            })

            if (res.id) {
                toast.success("비밀번호가 변경되었습니다.")
                return
            }
            toast.error("비밀번호 변경에 실패했습니다.")
        },
    })

    return (
        <InlineForm onSubmit={handleSubmit}>
            <Vexile gap={4}>
                <PageHeader>비밀번호 변경</PageHeader>
                <Input
                    label="비밀번호"
                    placeholder="설정할 비밀번호를 입력해주세요"
                    type="password"
                    name="hashedPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Button block>
                    <Important white>비밀번호 설정</Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}
