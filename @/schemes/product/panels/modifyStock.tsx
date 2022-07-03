import { Input, Button, InlineForm } from "@/components"
import { modifyStock } from "@/functions"
import { PanelComponent } from "@/types"
import { PageHeader, Important } from "@/typo"
import { Vexile } from "@haechi/flexile"
import { useFormik, useFormikContext } from "formik"
import React from "react"
import { toast } from "react-toastify"

interface FormContent {
    delta: number
    message: string
}

export const ModifyStock: PanelComponent = ({ record, reload }) => {
    const { handleSubmit, handleBlur, handleChange, errors } =
        useFormik<FormContent>({
            initialValues: {
                delta: 0,
                message: "",
            },
            async onSubmit(content) {
                try {
                    await modifyStock({
                        delta: +content.delta,
                        message: content.message,
                        productId: record.id,
                    })

                    toast.success(`재고를 변경했습니다`)
                } catch (e) {
                    toast.error(
                        "재고 수정에 실패했습니다. 잠시 후 다시 시도해주세요."
                    )
                } finally {
                    reload?.()
                }
            },
        })

    return (
        <InlineForm onSubmit={handleSubmit}>
            <Vexile gap={4}>
                <PageHeader>재고 수정</PageHeader>
                <Input
                    label="변경량"
                    placeholder="재고를 변경할 양을 입력해주세요"
                    type="number"
                    name="delta"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors?.delta}
                />
                <Input
                    label="메모"
                    placeholder="재고 변경에 대한 메모를 입력해주세요"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors?.message}
                />
                <Button block type="submit">
                    <Important white>재고 수정</Important>
                </Button>
            </Vexile>
        </InlineForm>
    )
}
