import { Input, Button, InlineForm } from "@/components"
import { modifyStock } from "@/functions"
import { PanelComponent } from "@/types"
import { PageHeader, Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

interface FormContent {
    delta: number
    message: string
}

export const ModifyStock: PanelComponent = ({ record, reload }) => {
    const { register, handleSubmit } = useForm<FormContent>()

    const onSubmit: SubmitHandler<FormContent> = async (content) => {
        try {
            await modifyStock({
                delta: +content.delta,
                message: content.message,
                productId: record.id,
            })

            toast.success(`재고를 변경했습니다`)
        } catch (e) {
            toast.error("재고 수정에 실패했습니다. 잠시 후 다시 시도해주세요.")
        } finally {
            reload()
        }
    }

    return (
        <InlineForm onSubmit={handleSubmit(onSubmit)}>
            <Vexile gap={4}>
                <PageHeader>재고 수정</PageHeader>
                <Input
                    name="변경량"
                    placeholder="재고를 변경할 양을 입력해주세요"
                    type="number"
                    hooker={register("delta", {
                        required: true,
                    })}
                />
                <Input
                    name="메모"
                    placeholder="재고 변경에 대한 메모를 입력해주세요"
                    hooker={register("message")}
                />
                <Button block type="submit">
                    <Important white>재고 수정</Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}
