import { Input, Button, InlineForm } from "@/components"
import { PanelComponent } from "@/types"
import { PageHeader, Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { SubmitHandler, useForm } from "react-hook-form"
import bcrypt from "bcryptjs"
import { table } from "@/functions"
import { toast } from "react-toastify"

interface FormContent {
    hashedPassword: string
}

export const ResetPassword: PanelComponent = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormContent>()

    const onSubmit: SubmitHandler<FormContent> = async (content) => {
        console.log(bcrypt.hashSync(content.hashedPassword, 10))
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
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile gap={4}>
                <PageHeader>비밀번호 변경</PageHeader>
                <Input
                    name="비밀번호"
                    placeholder="설정할 비밀번호를 입력해주세요"
                    hooker={register("hashedPassword", {
                        required: true,
                    })}
                />
                <Button block>
                    <Important white>비밀번호 설정</Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}
