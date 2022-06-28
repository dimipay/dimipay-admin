import { Description, Important, Regular } from "@/typo"
import { NEO_RECORD_BASE_FIELDS } from "./common"
import { Hexile, Vexile } from "@haechi/flexile"
import { text } from "@/fields/text"
import { TABLES } from "@/constants"
import { NeoField } from "@/fields"
import { NeoScheme } from "./user"
import { useState } from "react"
import { SLUG } from "@/types"

const EXTRA_PERMISSION_DOMAINS = [
    {
        id: "statistics",
        name: "통계",
    },
]

export type PermissionSymbol = "C" | "R" | "U" | "D"

const PermissionKormap = {
    R: "읽기",
    C: "만들기",
    U: "수정",
    D: "지우기",
}

const PermissionSymbols = Object.keys(PermissionKormap) as PermissionSymbol[]

const TablePermission: React.FC<{
    table: NeoScheme
    allowed: PermissionSymbol[]
    onChange: (allowed: PermissionSymbol[]) => void
}> = (props) => {
    const [isOpen, setOpen] = useState(false)

    const changeHandler = (crud: PermissionSymbol, checked: boolean) => {
        if (checked) return props.onChange([...props.allowed, crud])
        return props.onChange(props.allowed.filter((c) => c !== crud))
    }

    return (
        <Vexile gap={3}>
            <Hexile onClick={() => setOpen((e) => !e)} gap={2}>
                <Regular>{isOpen ? "↑" : "↓"}</Regular>
                <Hexile x="space" fillx linebreak gap={1} y="center">
                    <Regular>{props.table.name}</Regular>
                    <Description color="dark3">
                        {props.allowed.length === 4
                            ? "모두"
                            : props.allowed
                                  .map((char) => PermissionKormap[char])
                                  .join(", ")}
                    </Description>
                </Hexile>
            </Hexile>
            {isOpen && (
                <Vexile gap={2} x="left">
                    {props.allowed.length !== 4 ? (
                        <Description
                            onClick={() => props.onChange(["C", "R", "U", "D"])}
                            color="accent"
                        >
                            모두 선택
                        </Description>
                    ) : (
                        <Description
                            onClick={() => props.onChange([])}
                            color="accent"
                        >
                            모두 해제
                        </Description>
                    )}
                    <Hexile gap={2} y="center" linebreak>
                        {PermissionSymbols.map((crud, index) => (
                            <label>
                                <Hexile y="center" key={index} gap={1}>
                                    <input
                                        type="checkbox"
                                        checked={props.allowed.includes(crud)}
                                        onChange={(e) =>
                                            changeHandler(
                                                crud,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <Description color="dark2">
                                        {PermissionKormap[crud]}
                                    </Description>
                                </Hexile>
                            </label>
                        ))}
                    </Hexile>
                </Vexile>
            )}
        </Vexile>
    )
}

export type PermissionType = Record<SLUG, PermissionSymbol[]> & {
    extra: Record<string, boolean>
}

const permissionSelector: NeoField<PermissionType> = {
    EditComponent({ value = {}, setFieldValue, name, label }) {
        return (
            <Vexile gap={5}>
                <Important>{label}</Important>
                {TABLES.map((e) => (
                    <TablePermission
                        table={e}
                        allowed={value[e.slug] || []}
                        onChange={(allowed) => {
                            setFieldValue?.(name, {
                                ...value,
                                [e.slug]: allowed,
                            })
                        }}
                    />
                ))}
                <Vexile gap={2}>
                    {EXTRA_PERMISSION_DOMAINS.map((permission) => (
                        <Hexile x="space">
                            <Regular>{permission.name}</Regular>
                            <input
                                type="checkbox"
                                readOnly
                                checked={!!value.extra?.[permission.id]}
                                onChange={(e) => {
                                    setFieldValue?.(name, {
                                        ...value,
                                        extra: {
                                            ...value.extra,
                                            [permission.id]: e.target.checked,
                                        },
                                    })
                                }}
                            />
                        </Hexile>
                    ))}
                </Vexile>
            </Vexile>
        )
    },
    field: {
        displayName: "권한",
    },
    TableComponent(props) {
        if (!props.value) return <></>

        return (
            <Hexile>
                <Vexile gap={2}>
                    {Object.keys(props.value)
                        .filter((key) => TABLES.some((e) => e.slug === key))
                        .map((slug: string) => (
                            <Hexile gap={6} x="space">
                                <Regular>
                                    {TABLES.find((e) => e.slug === slug)
                                        ?.name ||
                                        EXTRA_PERMISSION_DOMAINS.find(
                                            (e) => e.id === slug
                                        )?.name}
                                </Regular>
                                <Description color="dark3">
                                    {props.value[slug as SLUG].length === 4
                                        ? "전체"
                                        : props.value[slug as SLUG]
                                              .map(
                                                  (crud) =>
                                                      PermissionKormap[crud]
                                              )
                                              .join(", ")}
                                </Description>
                            </Hexile>
                        ))}

                    {Object.keys(props.value.extra || {})
                        .filter((e) => props.value.extra[e])
                        .map((extraAllowed) => (
                            <Hexile gap={6} x="space">
                                <Regular>
                                    {
                                        EXTRA_PERMISSION_DOMAINS.find(
                                            (e) => e.id === extraAllowed
                                        )?.name
                                    }
                                </Regular>
                            </Hexile>
                        ))}
                </Vexile>
            </Hexile>
        )
    },
    type: "CUSTOM",
}

export const NEO_ADMIN_ROLE_SCHEME: NeoScheme = {
    name: "관리자 권한",
    slug: SLUG.adminRole,
    fields: {
        ...NEO_RECORD_BASE_FIELDS,
        name: text({
            displayName: "이름",
            required: true,
        }),
        permissions: permissionSelector,
    },
}
